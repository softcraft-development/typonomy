import { describe, expect, it } from "vitest"
import * as lib from "../src/bags"
import { isNumber } from "../src/numbers"

describe("isBag", () => {
  describe("isBag", () => {
    it("returns true for an array of the specified type", () => {
      expect(lib.isBag([1, 2, 3], isNumber)).toBe(true)
    })
    it("returns true for an empty array", () => {
      expect(lib.isBag([], isNumber)).toBe(true)
    })
    it("returns true for a single element array of the specified type", () => {
      expect(lib.isBag([42], isNumber)).toBe(true)
    })
    it("returns true if the value is undefined", () => {
      expect(lib.isBag(undefined, isNumber)).toBe(true)
    })
    it("returns true for a single value of the specified type", () => {
      expect(lib.isBag(42, isNumber)).toBe(true)
    })

    it("returns false for an array that contains other types", () => {
      expect(lib.isBag([1, "2", 3], isNumber)).toBe(false)
    })

    it("returns false if the value is null", () => {
      expect(lib.isBag(null, isNumber)).toBe(false)
    })
    it("returns false for a single value of another type", () => {
      expect(lib.isBag("42", isNumber)).toBe(false)
    })
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
