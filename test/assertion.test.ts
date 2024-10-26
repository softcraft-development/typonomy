import { beforeEach, describe, expect, it } from "vitest"
import * as lib from "../src/assertion"

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
