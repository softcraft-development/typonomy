import { beforeEach, describe, expect, it, vi } from "vitest"
import { mapArray } from "../../src/arrays"
import * as lib from "../../src/fp"
import { isNumber } from "../../src/numbers"
import { concat, isString, valueToString } from "../../src/strings"
import type { Transform, TypeGuard } from "../../src/types"

describe("Tuples", () => {
  const tuple: [number, string, boolean, null] = [1, "word", true, null]

  it("can be used as a regular array", () => {
    expect(mapArray(tuple, valueToString)).toEqual(["1", "word", "true", "null"])
  })

  it("can dereference individual elements", () => {
    expect(tuple[1]).toBe("word")
  })

  it("cannot dereference higher order elements", () => {
    // TypeScript does not let us use `tuple[4]`
    expect(tuple.at(4)).toBeUndefined()
  })

  it("cannot reduce to a lower order", () => {
    // TypeScript does not let us do this:
    //   const couple: [number, string] = tuple
    // ...unless we force it through `unknown:
    const guess: unknown = tuple
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const couple: [number, string] = guess as [number, string]
    // But this doesn't change the object
    expect(couple).toBe(tuple)
  })
})

describe("commute", () => {
  it("swaps the parameters", () => {
    const combine = (a: number, b: string) => `${a}:${b}`
    const commuted = lib.commute(combine)
    expect(commuted("Hello", 42)).toEqual(combine(42, "Hello"))
  })
})

describe("mapOptional", () => {
  const mapper = lib.mapOptional((value: string, index: number) => Number.parseInt(value) + index)

  it("maps a value", () => {
    expect(mapper("13", 5)).toEqual(18)
  })

  it("maps undefined", () => {
    expect(mapper(undefined, 5)).toBeUndefined()
  })
})

describe("noOp", () => {
  it("does nothing", () => {
    expect(lib.noOp("anything")).toBeUndefined()
  })
})

describe("offsetIndexReducer", () => {
  function testReducer(state: [string, number][], value: string, index: number): [string, number][] {
    state.push([value, index])
    return state
  }
  const reducer = lib.offsetIndexReducer(testReducer, 11)

  it("adds the base to the index", () => {
    expect(reducer([], "A value", 13)).toEqual([["A value", 24]])
  })
})

describe("passThrough", () => {
  it("returns the value", () => {
    const value = { key: "Test" }
    expect(lib.passThrough(value)).toBe(value)
  })
})

describe("reduceIf", () => {
  const reducer = lib.reduceIf<string, string, number, unknown>(
    isString,
    concat,
  )

  it("reduces a matching value", () => {
    expect(reducer("State", "Value", undefined)).toBe("StateValue")
  })

  it("ignores a non-matching value", () => {
    expect(reducer("State", 1, undefined)).toBe("State")
  })
})

describe("transformIf", () => {
  describe("for two transforms", () => {
    let guard: TypeGuard<number>
    let convert: Transform<number, string>
    let fallback: Transform<unknown, string>
    let transform: Transform<unknown, string>

    beforeEach(() => {
      guard = isNumber
      convert = vi.fn((value: number) => (value * 2).toString())
      fallback = vi.fn(lib.thunk("Fallback"))
      transform = lib.transformIf<number, unknown, string>(guard, convert, fallback)
    })

    describe("when passed a matching value", () => {
      it("uses the matching transform", () => {
        expect(transform(3)).toBe("6")
        expect(convert).toHaveBeenCalledWith(3)
        expect(fallback).not.toHaveBeenCalled()
      })
    })

    describe("when passed a non-matching value", () => {
      it("uses the non-matching transform", () => {
        expect(transform("Not-matching")).toBe("Fallback")
        expect(convert).not.toHaveBeenCalled()
        expect(fallback).toHaveBeenCalledWith("Not-matching")
      })
    })
  })
})

describe("thunk", () => {
  it("returns the value", () => {
    const value = { key: "Test" }
    expect(lib.thunk(value)()).toBe(value)
  })
})

