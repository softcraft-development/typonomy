import { beforeEach, describe, expect, it } from "vitest"
import { or } from "../src/logic"
import * as lib from "../src/typeGuards"
import type { Predicate } from "../src/types"

describe("assertType", () => {
  type Branded = string & { __brand: "Branded" }
  const guard = (value: unknown): value is Branded => {
    return value === "Is Branded"
  }

  describe("when the type matches", () => {
    it("asserts the type", () => {
      const value = "Is Branded"
      lib.assertType(value, guard)
      const branded: Branded = value
      expect(branded).toBe(value)
    })
  })

  describe("when the type does not match", () => {
    it("throws an AssertError", () => {
      const value = "Is Not Branded"
      expect(() => {
        lib.assertType(value, guard)
        // This line is unreachable if `assertType` throws its error.
        const branded: Branded = value
      }).toThrowError(lib.AssertError)
    })
  })
})

describe("enforceType", () => {
  type Branded = string & { __brand: "Branded" }
  const guard = (value: unknown): value is Branded => {
    return value === "Is Branded"
  }

  describe("when the type matches", () => {
    it("returns the type", () => {
      const value = "Is Branded"
      const branded: Branded = lib.enforceType(value, guard)
      expect(branded).toBe(value)
    })
  })

  describe("when the type does not match", () => {
    it("throws an AssertError", () => {
      const value = "Is Not Branded"
      expect(() => {
        lib.enforceType(value, guard)
      }).toThrowError(lib.AssertError)
    })
  })
})

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

describe("isArrayOf", () => {
  describe("when the value is an empty array", () => {
    describe("and emptyMatches is true", () => {
      it("returns true", () => {
        expect(lib.isArrayOf([], lib.isNumber, true)).toBe(true)
      })
    })

    describe("and emptyMatches is false", () => {
      it("returns false", () => {
        expect(lib.isArrayOf([], lib.isNumber, false)).toBe(false)
      })
    })
  })

  describe("when the value is an filled array", () => {
    describe("and the array contains only values of that type", () => {
      it("returns true", () => {
        expect(lib.isArrayOf([1, 2, 3], lib.isNumber)).toBe(true)
      })
    })

    describe("and the array contains any values not of that type", () => {
      it("returns false", () => {
        expect(lib.isArrayOf([1, 2, "3"], lib.isNumber)).toBe(false)
      })
    })
  })

  it("returns false if the value is of the array type", () => {
    expect(lib.isArrayOf(1, lib.isNumber)).toBe(false)
  })

  it("returns false for null", () => {
    expect(lib.isArrayOf(null, lib.isNumber)).toBe(false)
  })

  it("returns false for null", () => {
    expect(lib.isArrayOf(undefined, lib.isNumber)).toBe(false)
  })

  it("returns false for a string", () => {
    expect(lib.isArrayOf("test", lib.isNumber)).toBe(false)
  })

  it("returns false for an object", () => {
    expect(lib.isArrayOf({}, lib.isNumber)).toBe(false)
  })
})

describe("isBag", () => {
  describe("isBag", () => {
    it("returns true for an array of the specified type", () => {
      expect(lib.isBag([1, 2, 3], lib.isNumber)).toBe(true)
    })
    it("returns true for an empty array", () => {
      expect(lib.isBag([], lib.isNumber)).toBe(true)
    })
    it("returns true for a single element array of the specified type", () => {
      expect(lib.isBag([42], lib.isNumber)).toBe(true)
    })
    it("returns true if the value is undefined", () => {
      expect(lib.isBag(undefined, lib.isNumber)).toBe(true)
    })
    it("returns true for a single value of the specified type", () => {
      expect(lib.isBag(42, lib.isNumber)).toBe(true)
    })

    it("returns false for an array that contains other types", () => {
      expect(lib.isBag([1, "2", 3], lib.isNumber)).toBe(false)
    })

    it("returns false if the value is null", () => {
      expect(lib.isBag(null, lib.isNumber)).toBe(false)
    })
    it("returns false for a single value of another type", () => {
      expect(lib.isBag("42", lib.isNumber)).toBe(false)
    })
  })
})

describe("isEmptyArray", () => {
  it("returns true for an empty array", () => {
    expect(lib.isEmptyArray([])).toBe(true)
  })

  it("returns false a filled Array", () => {
    expect(lib.isEmptyArray([1, 2])).toBe(false)
  })

  it("returns false for null", () => {
    expect(lib.isEmptyArray(null)).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(lib.isEmptyArray(undefined)).toBe(false)
  })
})

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

describe("isFiniteNumber", () => {
  it("is true for a positive number", () => {
    expect(lib.isFiniteNumber(42)).toBe(true)
  })

  it("is true for a negative number", () => {
    expect(lib.isFiniteNumber(-42)).toBe(true)
  })

  it("is true for zero", () => {
    expect(lib.isFiniteNumber(0)).toBe(true)
  })

  it("is false for null", () => {
    expect(lib.isFiniteNumber(null)).toBe(false)
  })

  it("is false for undefined", () => {
    expect(lib.isFiniteNumber(undefined)).toBe(false)
  })

  it("is false for Infinity", () => {
    expect(lib.isFiniteNumber(Infinity)).toBe(false)
  })

  it("is false for -Infinity", () => {
    expect(lib.isFiniteNumber(-Infinity)).toBe(false)
  })

  it("is false for NaN", () => {
    expect(lib.isFiniteNumber(NaN)).toBe(false)
  })
})

describe("isInfinite", () => {
  it("is false for a positive number", () => {
    expect(lib.isInfinite(42)).toBe(false)
  })

  it("is false for a negative number", () => {
    expect(lib.isInfinite(-42)).toBe(false)
  })

  it("is false for zero", () => {
    expect(lib.isInfinite(0)).toBe(false)
  })

  it("is false for null", () => {
    expect(lib.isInfinite(null)).toBe(false)
  })

  it("is false for undefined", () => {
    expect(lib.isInfinite(undefined)).toBe(false)
  })

  it("is true for Infinity", () => {
    expect(lib.isInfinite(Infinity)).toBe(true)
  })

  it("is true for -Infinity", () => {
    expect(lib.isInfinite(-Infinity)).toBe(true)
  })

  it("is false for NaN", () => {
    expect(lib.isInfinite(NaN)).toBe(false)
  })
})

describe("isJson", () => {
  it("is true for null", () => {
    expect(lib.isJson(null)).toBe(true)
  })

  it("is false for undefined", () => {
    expect(lib.isJson(undefined)).toBe(false)
  })

  it("is true for true", () => {
    expect(lib.isJson(true)).toBe(true)
  })

  it("is true for false", () => {
    expect(lib.isJson(false)).toBe(true)
  })

  it("is true for a number", () => {
    expect(lib.isJson(42)).toBe(true)
  })

  it("is false for NaN", () => {
    expect(lib.isJson(NaN)).toBe(false)
  })

  it("is false for Infinity", () => {
    expect(lib.isJson(Infinity)).toBe(false)
  })

  it("is false for -Infinity", () => {
    expect(lib.isJson(-Infinity)).toBe(false)
  })

  it("is true for a string", () => {
    expect(lib.isJson("A String")).toBe(true)
  })

  it("is true for an array of Json", () => {
    expect(lib.isJson([
      null,
      true,
      false,
      42,
      "A String",
      {
        array: [42],
        object: { key: "value" },
        scalar: null,
      },
    ])).toBe(true)
  })

  it("is false for an array with any non-Json", () => {
    expect(lib.isJson([42, undefined])).toBe(false)
  })

  it("is true for an object of Json", () => {
    expect(lib.isJson({
      array: [42],
      boolean: true,
      null: null,
      number: 42,
      object: { key: "value" },
      string: "A String",
    })).toBe(true)
  })

  it("is false for an object with any non-Json", () => {
    expect(lib.isJson({
      number: 42,
      object: { key: undefined },
    })).toBe(false)
  })
})

describe("isJsonCollection", () => {
  it("is false for null", () => {
    expect(lib.isJsonCollection(null)).toBe(false)
  })

  it("is false for true", () => {
    expect(lib.isJsonCollection(true)).toBe(false)
  })

  it("is false for false", () => {
    expect(lib.isJsonCollection(false)).toBe(false)
  })

  it("is false for a number", () => {
    expect(lib.isJsonCollection(42)).toBe(false)
  })

  it("is false for a string", () => {
    expect(lib.isJsonCollection("A String")).toBe(false)
  })

  it("is true for an array of Json", () => {
    expect(lib.isJsonCollection([
      null,
      true,
      false,
      42,
      "A String",
      {
        array: [42],
        object: { key: "value" },
        scalar: null,
      },
    ])).toBe(true)
  })

  it("is false for an array with any non-Json", () => {
    expect(lib.isJsonCollection([42, undefined])).toBe(false)
  })

  it("is true for an object of Json", () => {
    expect(lib.isJsonCollection({
      array: [42],
      boolean: true,
      null: null,
      number: 42,
      object: { key: "value" },
      string: "A String",
    })).toBe(true)
  })

  it("is false for an object with any non-Json", () => {
    expect(lib.isJsonCollection({
      number: 42,
      object: { key: undefined },
    })).toBe(false)
  })
})

describe("isJsonParsed", () => {
  it("is true for null", () => {
    expect(lib.isJsonParsed(null)).toBe(true)
  })

  it("is true for true", () => {
    expect(lib.isJsonParsed(true)).toBe(true)
  })

  it("is true for false", () => {
    expect(lib.isJsonParsed(false)).toBe(true)
  })

  it("is true for a number", () => {
    expect(lib.isJsonParsed(42)).toBe(true)
  })

  it("is false for a string", () => {
    expect(lib.isJsonParsed("A String")).toBe(false)
  })

  it("is true for an array of Json", () => {
    expect(lib.isJsonParsed([
      null,
      true,
      false,
      42,
      "A String",
      {
        array: [42],
        object: { key: "value" },
        scalar: null,
      },
    ])).toBe(true)
  })

  it("is false for an array with any non-Json", () => {
    expect(lib.isJsonParsed([42, undefined])).toBe(false)
  })

  it("is true for an object of Json", () => {
    expect(lib.isJsonParsed({
      array: [42],
      boolean: true,
      null: null,
      number: 42,
      object: { key: "value" },
      string: "A String",
    })).toBe(true)
  })

  it("is false for an object with any non-Json", () => {
    expect(lib.isJsonParsed({
      number: 42,
      object: { key: undefined },
    })).toBe(false)
  })
})

describe("isJsonParsedScalar", () => {
  it("is true for null", () => {
    expect(lib.isJsonParsedScalar(null)).toBe(true)
  })

  it("is true for true", () => {
    expect(lib.isJsonParsedScalar(true)).toBe(true)
  })

  it("is true for false", () => {
    expect(lib.isJsonParsedScalar(false)).toBe(true)
  })

  it("is true for a number", () => {
    expect(lib.isJsonParsedScalar(42)).toBe(true)
  })

  it("is false for a string", () => {
    expect(lib.isJsonParsedScalar("A String")).toBe(false)
  })

  it("is false for an array of parsed scalar JSON", () => {
    expect(lib.isJsonParsedScalar([
      null,
      true,
      false,
      42,
    ])).toBe(false)
  })

  it("is false for an object of parsed scalar JSON", () => {
    expect(lib.isJsonParsedScalar({
      boolean: true,
      null: null,
      number: 42,
    })).toBe(false)
  })
})

describe("isJsonObject", () => {
  it("is false for null", () => {
    expect(lib.isJsonObject(null)).toBe(false)
  })

  it("is false for true", () => {
    expect(lib.isJsonObject(true)).toBe(false)
  })

  it("is false for false", () => {
    expect(lib.isJsonObject(false)).toBe(false)
  })

  it("is false for a number", () => {
    expect(lib.isJsonObject(42)).toBe(false)
  })

  it("is false for a string", () => {
    expect(lib.isJsonObject("A String")).toBe(false)
  })

  it("is false for an array of Json", () => {
    expect(lib.isJsonObject([
      null,
      true,
      false,
      42,
      "A String",
      {
        array: [42],
        object: { key: "value" },
        scalar: null,
      },
    ])).toBe(false)
  })

  it("is true for an object of Json", () => {
    expect(lib.isJsonObject({
      array: [42],
      boolean: true,
      null: null,
      number: 42,
      object: { key: "value" },
      string: "A String",
    })).toBe(true)
  })

  it("is false for an object with any non-Json", () => {
    expect(lib.isJson({
      number: 42,
      object: { key: undefined },
    })).toBe(false)
  })
})

describe("isJsonScalar", () => {
  it("is true for null", () => {
    expect(lib.isJsonScalar(null)).toBe(true)
  })

  it("is true for true", () => {
    expect(lib.isJsonScalar(true)).toBe(true)
  })

  it("is true for false", () => {
    expect(lib.isJsonScalar(false)).toBe(true)
  })

  it("is true for a number", () => {
    expect(lib.isJsonScalar(42)).toBe(true)
  })

  it("is true for a string", () => {
    expect(lib.isJsonScalar("A String")).toBe(true)
  })

  it("is false for an array of scalar JSON", () => {
    expect(lib.isJsonScalar([
      null,
      true,
      false,
      42,
    ])).toBe(false)
  })

  it("is false for an object of scalar JSON", () => {
    expect(lib.isJsonScalar({
      boolean: true,
      null: null,
      number: 42,
    })).toBe(false)
  })
})

describe("isNegativeInfinity", () => {
  it("is false for a positive number", () => {
    expect(lib.isNegativeInfinity(42)).toBe(false)
  })

  it("is false for a negative number", () => {
    expect(lib.isNegativeInfinity(-42)).toBe(false)
  })

  it("is false for zero", () => {
    expect(lib.isNegativeInfinity(0)).toBe(false)
  })

  it("is false for null", () => {
    expect(lib.isNegativeInfinity(null)).toBe(false)
  })

  it("is false for undefined", () => {
    expect(lib.isNegativeInfinity(undefined)).toBe(false)
  })

  it("is false for Infinity", () => {
    expect(lib.isNegativeInfinity(Infinity)).toBe(false)
  })

  it("is true for -Infinity", () => {
    expect(lib.isNegativeInfinity(-Infinity)).toBe(true)
  })

  it("is false for NaN", () => {
    expect(lib.isNegativeInfinity(NaN)).toBe(false)
  })
})

describe("isNotANumber", () => {
  it("is false for a positive number", () => {
    expect(lib.isNotANumber(42)).toBe(false)
  })

  it("is false for a negative number", () => {
    expect(lib.isNotANumber(-42)).toBe(false)
  })

  it("is false for zero", () => {
    expect(lib.isNotANumber(0)).toBe(false)
  })

  it("is false for null", () => {
    expect(lib.isNotANumber(null)).toBe(false)
  })

  it("is false for undefined", () => {
    expect(lib.isNotANumber(undefined)).toBe(false)
  })

  it("is false for Infinity", () => {
    expect(lib.isNotANumber(Infinity)).toBe(false)
  })

  it("is false for -Infinity", () => {
    expect(lib.isNotANumber(-Infinity)).toBe(false)
  })

  it("is true for NaN", () => {
    expect(lib.isNotANumber(NaN)).toBe(true)
  })
})

describe("isPositiveInfinity", () => {
  it("is false for a positive number", () => {
    expect(lib.isPositiveInfinity(42)).toBe(false)
  })

  it("is false for a negative number", () => {
    expect(lib.isPositiveInfinity(-42)).toBe(false)
  })

  it("is false for zero", () => {
    expect(lib.isPositiveInfinity(0)).toBe(false)
  })

  it("is false for null", () => {
    expect(lib.isPositiveInfinity(null)).toBe(false)
  })

  it("is false for undefined", () => {
    expect(lib.isPositiveInfinity(undefined)).toBe(false)
  })

  it("is true for Infinity", () => {
    expect(lib.isPositiveInfinity(Infinity)).toBe(true)
  })

  it("is false for -Infinity", () => {
    expect(lib.isPositiveInfinity(-Infinity)).toBe(false)
  })

  it("is false for NaN", () => {
    expect(lib.isPositiveInfinity(NaN)).toBe(false)
  })
})

describe("isString", () => {
  it("returns true for a string", () => {
    const result = lib.isString("Hello")
    expect(result).toBe(true)
  })

  it("returns false for a number", () => {
    const result = lib.isString(42)
    expect(result).toBe(false)
  })

  it("returns false for a boolean", () => {
    const result = lib.isString(true)
    expect(result).toBe(false)
  })

  it("returns false for an object", () => {
    const result = lib.isString({ toString: () => "Value of Object" })
    expect(result).toBe(false)
  })

  it("returns false for null", () => {
    const result = lib.isString(null)
    expect(result).toBe(false)
  })

  it("returns false for undefined", () => {
    const result = lib.isString(undefined)
    expect(result).toBe(false)
  })

  it("returns false for a symbol", () => {
    const result = lib.isString(Symbol("Test Symbol"))
    expect(result).toBe(false)
  })
})

describe("isPlural", () => {
  it("returns true for an array with elements", () => {
    expect(lib.isPlural([1, 2, 3])).toBe(true)
  })

  it("returns true for an empty array", () => {
    expect(lib.isPlural([])).toBe(true)
  })

  it("returns true for a single element array", () => {
    expect(lib.isPlural([42])).toBe(true)
  })

  it("returns false if the value is a single element", () => {
    expect(lib.isPlural(42)).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(lib.isPlural(undefined)).toBe(false)
  })
})

describe("isSingular", () => {
  it("returns false for an array with elements", () => {
    expect(lib.isSingular([1, 2, 3])).toBe(false)
  })

  it("returns false for an empty array", () => {
    expect(lib.isSingular([])).toBe(false)
  })

  it("returns false for a single element array", () => {
    expect(lib.isSingular([42])).toBe(false)
  })

  it("returns true if the value is a single element", () => {
    expect(lib.isSingular(42)).toBe(true)
  })

  it("returns false for undefined", () => {
    expect(lib.isSingular(undefined)).toBe(false)
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

describe("isSome", () => {
  describe("isSome", () => {
    it("returns true for an array of the specified type", () => {
      expect(lib.isSome([1, 2, 3], lib.isNumber)).toBe(true)
    })
    it("returns false for an empty array", () => {
      expect(lib.isSome([], lib.isNumber)).toBe(false)
    })
    it("returns true for a single element array of the specified type", () => {
      expect(lib.isSome([42], lib.isNumber)).toBe(true)
    })
    it("returns false if the value is undefined", () => {
      expect(lib.isSome(undefined, lib.isNumber)).toBe(false)
    })
    it("returns true for a single value of the specified type", () => {
      expect(lib.isSome(42, lib.isNumber)).toBe(true)
    })

    it("returns false for an array that contains other types", () => {
      expect(lib.isSome([1, "2", 3], lib.isNumber)).toBe(false)
    })

    it("returns false if the value is null", () => {
      expect(lib.isSome(null, lib.isNumber)).toBe(false)
    })
    it("returns false for a single value of another type", () => {
      expect(lib.isSome("42", lib.isNumber)).toBe(false)
    })
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
