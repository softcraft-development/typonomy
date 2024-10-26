import { describe, expect, it } from "vitest"
import * as lib from "../../src/arrays"
import { isNumber } from "../../src/numbers"

describe("isArrayOf", () => {
  describe("when the value is an empty array", () => {
    describe("and emptyMatches is true", () => {
      it("returns true", () => {
        expect(lib.isArrayOf([], isNumber, true)).toBe(true)
      })
    })

    describe("and emptyMatches is false", () => {
      it("returns false", () => {
        expect(lib.isArrayOf([], isNumber, false)).toBe(false)
      })
    })
  })

  describe("when the value is an filled array", () => {
    describe("and the array contains only values of that type", () => {
      it("returns true", () => {
        expect(lib.isArrayOf([1, 2, 3], isNumber)).toBe(true)
      })
    })

    describe("and the array contains any values not of that type", () => {
      it("returns false", () => {
        expect(lib.isArrayOf([1, 2, "3"], isNumber)).toBe(false)
      })
    })
  })

  it("returns false if the value is of the array type", () => {
    expect(lib.isArrayOf(1, isNumber)).toBe(false)
  })

  it("returns false for null", () => {
    expect(lib.isArrayOf(null, isNumber)).toBe(false)
  })

  it("returns false for null", () => {
    expect(lib.isArrayOf(undefined, isNumber)).toBe(false)
  })

  it("returns false for a string", () => {
    expect(lib.isArrayOf("test", isNumber)).toBe(false)
  })

  it("returns false for an object", () => {
    expect(lib.isArrayOf({}, isNumber)).toBe(false)
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
