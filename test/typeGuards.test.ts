import { describe, expect, it } from "vitest"
import { or } from "../src/logic"
import { isNumber } from "../src/number"
import { isObject } from "../src/objects"
import { isString } from "../src/strings"
import * as lib from "../src/typeGuards"
import type { Predicate } from "../src/types"

describe("isEquality", () => {
  it("returns true if the values are equal", () => {
    expect(lib.isEquality(42, 42)).toBe(true)
  })

  it("returns true if the values are the same string", () => {
    expect(lib.isEquality("42", "42")).toBe(true)
  })

  it("returns true if both values are undefined", () => {
    expect(lib.isEquality(undefined, undefined)).toBe(true)
  })

  it("returns true if both values are null", () => {
    expect(lib.isEquality(null, null)).toBe(true)
  })

  it("returns true if both values are Infinity", () => {
    expect(lib.isEquality(Infinity, Infinity)).toBe(true)
  })

  it("returns false if both values are NaN", () => {
    expect(lib.isEquality(NaN, NaN)).toBe(false)
  })

  it("returns false if the values are symbols", () => {
    expect(lib.isEquality(Symbol("test"), Symbol("test"))).toBe(false)
  })

  it("returns false if the values are different objects", () => {
    expect(lib.isEquality({ key: "test" }, { key: "test" })).toBe(false)
  })

  it("returns false if the values are not equal", () => {
    expect(lib.isEquality<unknown>(42, "42")).toBe(false)
  })
})

describe("isBoolean", () => {
  it("returns true for true", () => {
    expect(lib.isBoolean(true)).toBe(true)
  })

  it("returns true for false", () => {
    expect(lib.isBoolean(false)).toBe(true)
  })

  it("returns false for strings", () => {
    expect(lib.isBoolean("true")).toBe(false)
  })

  it("returns false for numbers", () => {
    expect(lib.isBoolean(1)).toBe(false)
  })

  it("returns false for null", () => {
    expect(lib.isBoolean(null)).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(lib.isBoolean(undefined)).toBe(false)
  })
})

describe("isExplicit", () => {
  it("returns false for a null value", () => {
    expect(lib.isExplicit(null)).toBe(false)
  })

  it("returns false for an undefined value", () => {
    expect(lib.isExplicit(undefined)).toBe(false)
  })

  it("returns true for a string", () => {
    expect(lib.isExplicit("Explicit")).toBe(true)
  })

  it("returns true for an object", () => {
    expect(lib.isExplicit({})).toBe(true)
  })

  it("returns true for a number", () => {
    expect(lib.isExplicit(23)).toBe(true)
  })

  it("returns true for a boolean", () => {
    expect(lib.isExplicit(false)).toBe(true)
  })
})

describe("isNull", () => {
  it("returns true for null", () => {
    expect(lib.isNull(null)).toBe(true)
  })

  it("returns false for undefined", () => {
    expect(lib.isNull(undefined)).toBe(false)
  })

  it("returns false for an empty string", () => {
    expect(lib.isNull("")).toBe(false)
  })

  it("returns false for zero", () => {
    expect(lib.isNull(0)).toBe(false)
  })

  it("returns false for false", () => {
    expect(lib.isNull(false)).toBe(false)
  })

  it("returns false for an empty object", () => {
    expect(lib.isNull({})).toBe(false)
  })

  it("returns false for an empty array", () => {
    expect(lib.isNull([])).toBe(false)
  })
})

describe("isNullish", () => {
  it("returns true for a null value", () => {
    expect(lib.isNullish(null)).toBe(true)
  })

  it("returns true for an undefined value", () => {
    expect(lib.isNullish(undefined)).toBe(true)
  })

  it("returns false for an definite value", () => {
    expect(lib.isNullish("Explicit")).toBe(false)
  })
})

describe("isUnknown", () => {
  it("is true for false", () => {
    expect(lib.isUnknown(false)).toBe(true)
  })

  it("is true for undefined", () => {
    expect(lib.isUnknown(undefined)).toBe(true)
  })

  it("is true for null", () => {
    expect(lib.isUnknown(null)).toBe(true)
  })

  it("is true for NaN", () => {
    expect(lib.isUnknown(NaN)).toBe(true)
  })
})

describe("isUndefined", () => {
  it("returns true for undefined", () => {
    expect(lib.isUndefined(undefined)).toBe(true)
  })

  it("returns false for null", () => {
    expect(lib.isUndefined(null)).toBe(false)
  })

  it("returns false for an empty string", () => {
    expect(lib.isUndefined("")).toBe(false)
  })

  it("returns false for zero", () => {
    expect(lib.isUndefined(0)).toBe(false)
  })

  it("returns false for false", () => {
    expect(lib.isUndefined(false)).toBe(false)
  })

  it("returns false for an empty object", () => {
    expect(lib.isUndefined({})).toBe(false)
  })

  it("returns false for an empty array", () => {
    expect(lib.isUndefined([])).toBe(false)
  })
})

describe("nullify", () => {
  it("returns null for undefined", () => {
    expect(lib.nullify(undefined)).toBe(null)
  })

  it("returns null for null", () => {
    expect(lib.nullify(null)).toBe(null)
  })

  it("returns an explicit value", () => {
    const value = { key: "Explicit" }
    expect(lib.nullify(value)).toBe(value)
  })
})

describe("narrow", () => {
  describe("for union types", () => {
    type Wide = string | null
    const wide = lib.typeGuard<Wide>(or(isString, lib.isNull))
    const guard = lib.narrow<Wide, null>(wide, lib.isNull)

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

describe("undefine", () => {
  it("returns undefined for undefined", () => {
    expect(lib.undefine(undefined)).toBe(undefined)
  })

  it("returns undefined for null", () => {
    expect(lib.undefine(null)).toBe(undefined)
  })

  it("returns an explicit value", () => {
    const value = { key: "Explicit" }
    expect(lib.undefine(value)).toBe(value)
  })
})

describe("widen", () => {
  const narrow = isString
  const guard = lib.widen(narrow, lib.isNull)

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
