import { describe, expect, it } from "vitest"
import * as lib from "../../src/typeGuards"

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
