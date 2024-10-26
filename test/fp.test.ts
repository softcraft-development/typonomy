import { beforeEach, describe, expect, it, vi } from "vitest"
import { mapArray } from "../src/arrays"
import * as lib from "../src/fp"
import { isNumber } from "../src/number"
import { concat, isString, valueToString } from "../src/strings"
import type { Transform, TypeGuard } from "../src/types"

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

describe("compose", () => {
  it("creates a transform from the input to result type", () => {
    const toIntermediate = (value: string) => value.length
    const toResult = valueToString
    const composed = lib.compose(toIntermediate, toResult)
    expect(composed("Hello")).toBe("5")
  })
})

describe("composeDown", () => {
  it("creates a new Combine from a Combine and a transform for the result", () => {
    const intermediate = (a: number, b: number): number => a + b
    const transform = valueToString
    const combine = lib.composeDown(intermediate, transform)
    expect(combine(3, 5)).toEqual("8")
  })
})

describe("composeLeft", () => {
  it("creates a new Combine from a Combine and a transform for the left type", () => {
    const intermediate = (a: number, b: number): number => a + b
    const transform = (value: string) => parseInt(value, 10)
    const combine = lib.composeLeft(transform, intermediate)
    expect(combine("7", 11)).toEqual(18)
  })
})

describe("composeReducer", () => {
  it("creates a new reducer via the Combine function", () => {
    const combine = (value: number, key: string): string => valueToString(value + key.length)
    const reduceIntermediate = (state: string, value: string, key: string): string => `${state} ${key}=${value}`
    const reducer = lib.composeReducer(combine, reduceIntermediate)
    expect(reducer("Start", 3, "test")).toEqual("Start test=7")
  })
})

describe("composeRight", () => {
  it("creates a new Combine from a Combine and a transform for the right type", () => {
    const transform = (value: string) => parseInt(value, 10)
    const intermediate = (a: number, b: number): number => a + b
    const combine = lib.composeRight(transform, intermediate)
    expect(combine(13, "17")).toEqual(30)
  })
})

describe("curry", () => {
  it("curries a combine", () => {
    const combine = (a: number, b: string) => `A: ${a}, B: ${b}`
    const curried = lib.curry(combine)
    expect(curried(3)("A String")).toEqual("A: 3, B: A String")
  })
})

describe("curryLeft", () => {
  it("curries the first parameter of a 3-arity function", () => {
    const fn = (a: number, b: number, c: number) => `A: ${a}, B: ${b} C: ${c}`
    const curried = lib.curryLeft(fn)
    expect(curried(3)(5, 7)).toEqual(fn(3, 5, 7))
  })
})

describe("curryMiddle", () => {
  it("curries the second parameter of a 3-arity function", () => {
    const fn = (a: number, b: number, c: number) => `A: ${a}, B: ${b} C: ${c}`
    const curried = lib.curryMiddle(fn)
    expect(curried(5)(3, 7)).toEqual(fn(3, 5, 7))
  })
})

describe("curryRight", () => {
  it("curries the third parameter of a 3-arity function", () => {
    const fn = (a: number, b: number, c: number) => `A: ${a}, B: ${b} C: ${c}`
    const curried = lib.curryRight(fn)
    expect(curried(7)(3, 5)).toEqual(fn(3, 5, 7))
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

describe("partial", () => {
  it("partially applies a value to the parameter of a Transform", () => {
    const thunk = lib.partial(valueToString, 23)
    expect(thunk()).toBe("23")
  })
})

describe("partialLeft", () => {
  it("partially applies a parameter to the left parameter of a Combine", () => {
    const divide = (a: number, b: number) => a / b
    const invert = lib.partialLeft(divide, 1)
    expect(invert(10)).toBe(0.1)
  })
})

describe("partialRight", () => {
  it("partially applies a parameter to the right parameter of a Combine", () => {
    const divide = (a: number, b: number) => a / b
    const half = lib.partialRight(divide, 2)
    expect(half(6)).toBe(3)
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

describe("uncurry", () => {
  it("creates a Combine from curried Transforms", () => {
    const curried = (a: number) => (b: string) => `A: ${a}, B: ${b}`
    const combine = lib.uncurry(curried)
    expect(combine(3, "A String")).toEqual("A: 3, B: A String")
  })
})

describe("unyrruc", () => {
  it("creates a Combine from curried Transforms", () => {
    const curried = (a: number) => (b: string) => `A: ${a}, B: ${b}`
    const combine = lib.unyrruc(curried)
    expect(combine("A String", 5)).toEqual("A: 5, B: A String")
  })
})

describe("yrruc", () => {
  it("reverse curries a combine", () => {
    const combine = (a: number, b: string) => `A: ${a}, B: ${b}`
    const curried = lib.yrruc(combine)
    expect(curried("A String")(3)).toEqual("A: 3, B: A String")
  })
})
