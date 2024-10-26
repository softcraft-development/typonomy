import { describe, expect, it } from "vitest"
import * as lib from "../src/json"

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
