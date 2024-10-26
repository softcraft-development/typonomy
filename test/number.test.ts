import { describe, expect, it } from "vitest"
import * as lib from "../src/number"

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
