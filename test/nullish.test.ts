import { describe, expect, it } from "vitest"
import * as lib from "../src/nullish"

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
