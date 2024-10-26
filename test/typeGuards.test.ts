import { describe, expect, it } from "vitest"
import { or } from "../src/logic"
import { isNull } from "../src/nullish"
import { isNumber } from "../src/numbers"
import { isObject } from "../src/objects"
import { isString } from "../src/strings"
import * as lib from "../src/typeGuards"
import type { Predicate } from "../src/types"

describe("narrow", () => {
  describe("for union types", () => {
    type Wide = string | null
    const wide = lib.typeGuard<Wide>(or(isString, isNull))
    const guard = lib.narrow<Wide, null>(wide, isNull)

    it("returns false if the value is of the excluded type", () => {
      expect(guard(null)).toBe(false)
    })

    it("would have returned true without the narrowing", () => {
      expect(wide(null)).toBe(true)
    })

    it("returns true if the value is of the unexcluded type", () => {
      expect(guard("Explicit")).toBe(true)
    })
  })

  describe("for subtypes", () => {
    type Wide = object
    const wide = (value: unknown): value is object => typeof value === "object"
    // Note that TypeScript does not consider this to be TypeGuard<Exclude<object, Array<unknown>>>
    const guard = lib.narrow<Wide, Array<unknown>>(wide, Array.isArray)

    it("returns false if the value is of the excluded type", () => {
      expect(guard([])).toBe(false)
    })

    it("would have returned true without the narrowing", () => {
      expect(wide([])).toBe(true)
    })

    it("returns true if the value is of the unexcluded type", () => {
      expect(guard({})).toBe(true)
    })
  })
})

describe("typeGuard", () => {
  type TestType = { even: number }
  const predicate: Predicate<unknown> = (value: unknown): boolean => {
    if (!isObject(value)) return false
    if (!("even" in value)) return false
    if (!isNumber(value.even)) return false
    return value.even % 2 === 0
  }
  const guard = lib.typeGuard<TestType>(predicate)

  it("converts a predicate to a type guard", () => {
    const value: unknown = { even: 42 }
    if (guard(value)) {
      const typed = value
      expect(typed.even).toBe(42)
    }
    else {
      expect.fail("Type guard incorrectly rejected valid object")
    }
  })

  it("guards against invalid types", () => {
    const value: unknown = { even: -1 }
    expect(guard(value)).toBe(false)
  })
})

describe("widen", () => {
  const narrow = isString
  const guard = lib.widen(narrow, isNull)

  it("returns true if the value is of the included type", () => {
    expect(guard(null)).toBe(true)
  })

  it("would have returned false without the widening", () => {
    expect(narrow(null)).toBe(false)
  })

  it("returns true if the value is the base type", () => {
    expect(guard("Explicit")).toBe(true)
  })
})
