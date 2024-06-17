import { describe, expect, it } from "vitest"
import { or, type Predicate } from "../src/func"
import { isNull } from "../src/nullish"
import { isObject } from "../src/objects"
import { isString } from "../src/strings"
import * as lib from "../src/types"

describe("types", () => {
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

  describe("typeGuard", () => {
    type TestType = { even: number }
    const predicate: Predicate<unknown> = (value: unknown): boolean => {
      if (!isObject(value)) return false
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
