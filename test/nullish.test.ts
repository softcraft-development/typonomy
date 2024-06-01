import { beforeEach, describe, expect, it } from "vitest"
import * as nullish from "../src/nullish"

describe("nullish", () => {
  describe("insist", () => {
    let value: object | null | undefined

    describe("when the value is not null or undefined", () => {
      beforeEach(() => {
        value = { key: "A specific object" }
      })

      it("is the same object", () => {
        expect(nullish.insist(value)).toBe(value)
      })
    })

    describe("when the value is null", () => {
      beforeEach(() => {
        value = null
      })

      it("throws an error", () => {
        expect(() => nullish.insist(value)).toThrow()
      })
    })

    describe("when the value is undefined", () => {
      beforeEach(() => {
        value = undefined
      })

      it("throws an error", () => {
        expect(() => nullish.insist(value)).toThrow()
      })
    })
  })

  describe("isDefined", () => {
    it("returns true for a defined value", () => {
      expect(nullish.isDefined<string>("Defined")).toBe(true)
    })

    it("returns false for an undefined value", () => {
      expect(nullish.isDefined<string>(undefined)).toBe(false)
    })
  })

  describe("isDefinite", () => {
    it("returns true for a present value", () => {
      expect(nullish.isDefinite("Definite")).toBe(true)
    })

    it("returns false for a null value", () => {
      expect(nullish.isDefinite<string>(null)).toBe(false)
    })

    it("returns false for an undefined value", () => {
      expect(nullish.isDefinite<string>(undefined)).toBe(false)
    })
  })

  describe("isSubstantial", () => {
    it("returns true for a non-null value", () => {
      expect(nullish.isSubstantial<string>("Substantial")).toBe(true)
    })

    it("returns false for a null value", () => {
      expect(nullish.isSubstantial<string>(null)).toBe(false)
    })
  })

  describe("isNullable", () => {
    it("returns true for null", () => {
      expect(nullish.isNullable<string>(null)).toBe(true)
    })

    it("returns true for a defined value", () => {
      expect(nullish.isNullable<string>("Not Null")).toBe(true)
    })

    it("returns false for an undefined value", () => {
      expect(nullish.isNullable<string>(undefined)).toBe(false)
    })
  })

  describe("isNullish", () => {
    it("returns true for a null value", () => {
      expect(nullish.isNullish<string>(null)).toBe(true)
    })

    it("returns true for an undefined value", () => {
      expect(nullish.isNullish<string>(undefined)).toBe(true)
    })

    it("returns false for an definite value", () => {
      expect(nullish.isNullish<string>("Definite")).toBe(false)
    })
  })

  describe("isOptional", () => {
    it("returns true for an defined value", () => {
      expect(nullish.isOptional<string>("Defined")).toBe(true)
    })

    it("returns true for an undefined value", () => {
      expect(nullish.isOptional<string>(undefined)).toBe(true)
    })

    it("returns false for a null value", () => {
      expect(nullish.isOptional<string>(null)).toBe(false)
    })
  })
})
