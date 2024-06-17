import { beforeEach, describe, expect, it } from "vitest"
import * as lib from "../src/nullish"

describe("nullish", () => {
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

  describe("isDefined", () => {
    it("returns true for a defined value", () => {
      expect(lib.isDefined<string>("Defined")).toBe(true)
    })

    it("returns false for an undefined value", () => {
      expect(lib.isDefined<string>(undefined)).toBe(false)
    })
  })

  describe("isDefinite", () => {
    it("returns true for a present value", () => {
      expect(lib.isDefinite("Definite")).toBe(true)
    })

    it("returns false for a null value", () => {
      expect(lib.isDefinite<string>(null)).toBe(false)
    })

    it("returns false for an undefined value", () => {
      expect(lib.isDefinite<string>(undefined)).toBe(false)
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

  describe("isNullable", () => {
    it("returns true for null", () => {
      expect(lib.isNullable<string>(null)).toBe(true)
    })

    it("returns true for a defined value", () => {
      expect(lib.isNullable<string>("Not Null")).toBe(true)
    })

    it("returns false for an undefined value", () => {
      expect(lib.isNullable<string>(undefined)).toBe(false)
    })
  })

  describe("isNullish", () => {
    it("returns true for a null value", () => {
      expect(lib.isNullish<string>(null)).toBe(true)
    })

    it("returns true for an undefined value", () => {
      expect(lib.isNullish<string>(undefined)).toBe(true)
    })

    it("returns false for an definite value", () => {
      expect(lib.isNullish<string>("Definite")).toBe(false)
    })
  })

  describe("isOptional", () => {
    it("returns true for an defined value", () => {
      expect(lib.isOptional<string>("Defined")).toBe(true)
    })

    it("returns true for an undefined value", () => {
      expect(lib.isOptional<string>(undefined)).toBe(true)
    })

    it("returns false for a null value", () => {
      expect(lib.isOptional<string>(null)).toBe(false)
    })
  })

  describe("isSubstantial", () => {
    it("returns true for a non-null value", () => {
      expect(lib.isSubstantial<string>("Substantial")).toBe(true)
    })

    it("returns false for a null value", () => {
      expect(lib.isSubstantial<string>(null)).toBe(false)
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
})
