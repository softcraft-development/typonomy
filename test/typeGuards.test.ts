import { beforeEach, describe, expect, it } from "vitest"
import { or } from "../src/logic"
import * as lib from "../src/typeGuards"
import type { Predicate } from "../src/types"

describe("typeGuards", () => {
  describe("insist", () => {
    let value: object | null | undefined

    describe("when the value is not null or undefined", () => {
      beforeEach(() => {
        value = { key: "A specific object" }
      })

      it("is the same object", () => {
        expect(lib.insist(value)).toBe(value)
      })
    })

    describe("when the value is null", () => {
      beforeEach(() => {
        value = null
      })

      it("throws an error", () => {
        expect(() => lib.insist(value)).toThrow()
      })
    })

    describe("when the value is undefined", () => {
      beforeEach(() => {
        value = undefined
      })

      it("throws an error", () => {
        expect(() => lib.insist(value)).toThrow()
      })
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

  describe("isEmptyObject", () => {
    it("returns true for an empty object", () => {
      expect(lib.isEmptyObject({})).toBe(true)
    })

    it("returns false for an object with keys", () => {
      expect(lib.isEmptyObject({ a: 1, b: 2 })).toBe(false)
    })

    it("returns false for null", () => {
      expect(lib.isEmptyObject(null)).toBe(false)
    })

    it("returns false for undefined", () => {
      expect(lib.isEmptyObject(undefined)).toBe(false)
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

  describe("isInfinite", () => {
    it("returns true for Infinity", () => {
      expect(lib.isInfinite(Infinity)).toBe(true)
    })

    it("returns true for -Infinity", () => {
      expect(lib.isInfinite(-Infinity)).toBe(true)
    })

    it("returns false for another number", () => {
      expect(lib.isInfinite(19)).toBe(false)
    })

    it("returns false for NaN", () => {
      expect(lib.isInfinite(NaN)).toBe(false)
    })

    it("returns false for strings", () => {
      expect(lib.isInfinite("Infinity")).toBe(false)
    })

    it("returns false for null", () => {
      expect(lib.isInfinite(null)).toBe(false)
    })

    it("returns false for undefined", () => {
      expect(lib.isInfinite(undefined)).toBe(false)
    })
  })

  describe("isNumber", () => {
    describe("when nanAllowed is true", () => {
      it("returns true for Nan", () => {
        expect(lib.isNumber(NaN, true)).toBe(true)
      })
    })

    describe("when nanAllowed is false", () => {
      it("returns false for Nan", () => {
        expect(lib.isNumber(NaN, false)).toBe(false)
      })
    })

    describe("when infiniteAllowed is true", () => {
      it("returns true for Infinity", () => {
        expect(lib.isNumber(Infinity, false, true)).toBe(true)
      })

      it("returns true for -Infinity", () => {
        expect(lib.isNumber(-Infinity, false, true)).toBe(true)
      })
    })

    describe("when infiniteAllowed is false", () => {
      it("returns false for Infinity", () => {
        expect(lib.isNumber(Infinity, false, false)).toBe(false)
      })

      it("returns false for -Infinity", () => {
        expect(lib.isNumber(-Infinity, false, false)).toBe(false)
      })
    })

    it("returns true if the value is a number", () => {
      expect(lib.isNumber(3)).toBe(true)
    })

    it("returns false if the value is a string", () => {
      expect(lib.isNumber("42")).toBe(false)
    })

    it("returns false if the value is an object", () => {
      expect(lib.isNumber({})).toBe(false)
    })

    it("returns false if the value is a boolean", () => {
      expect(lib.isNumber(true)).toBe(false)
    })

    it("returns false if the value is null", () => {
      expect(lib.isNumber(null)).toBe(false)
    })

    it("returns false if the value is undefined", () => {
      expect(lib.isNumber(undefined)).toBe(false)
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

  describe("isObject", () => {
    it("returns true if the value is an object", () => {
      expect(lib.isObject({})).toBe(true)
    })

    it("returns false if the value is an array", () => {
      expect(lib.isObject([])).toBe(false)
    })

    it("returns false if the value is a number", () => {
      expect(lib.isObject(17)).toBe(false)
    })

    it("returns false if the value is a string", () => {
      expect(lib.isObject("test")).toBe(false)
    })

    it("returns false if the value is null", () => {
      expect(lib.isObject(null)).toBe(false)
    })

    it("returns false if the value is undefined", () => {
      expect(lib.isObject(undefined)).toBe(false)
    })
  })

  describe("isPropertyKey", () => {
    it("returns true if the value is a string", () => {
      expect(lib.isPropertyKey("hello")).toBe(true)
    })

    it("returns true if the value is a number", () => {
      expect(lib.isPropertyKey(13)).toBe(true)
    })

    it("returns true if the value is a Symbol", () => {
      expect(lib.isPropertyKey(Symbol("test"))).toBe(true)
    })

    it("returns false if the value is an object", () => {
      expect(lib.isPropertyKey({})).toBe(false)
    })

    it("returns false if the value is a boolean", () => {
      expect(lib.isPropertyKey(true)).toBe(false)
    })

    it("returns false if the value is null", () => {
      expect(lib.isPropertyKey(null)).toBe(false)
    })

    it("returns false if the value is undefined", () => {
      expect(lib.isPropertyKey(false)).toBe(false)
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

  describe("narrow", () => {
    describe("for union types", () => {
      type Wide = string | null
      const wide = lib.typeGuard<Wide>(or(lib.isString, lib.isNull))
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

  describe("widen", () => {
    const narrow = lib.isString
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

  describe("typeGuard", () => {
    type TestType = { even: number }
    const predicate: Predicate<unknown> = (value: unknown): boolean => {
      if (!lib.isObject(value)) return false
      if (!("even" in value)) return false
      if (!lib.isNumber(value.even)) return false
      return value.even % 2 === 0
    }
    const guard = lib.typeGuard<TestType>(predicate)

    it("converts a predicate to a type guard", () => {
      const obj: unknown = { even: 42 }
      if (guard(obj)) {
        const typed = obj
        expect(typed.even).toBe(42)
      }
      else {
        expect.fail("Type guard incorrectly rejected valid object")
      }
    })

    it("guards against invalid types", () => {
      const obj: unknown = { even: -1 }
      expect(guard(obj)).toBe(false)
    })
  })
})
