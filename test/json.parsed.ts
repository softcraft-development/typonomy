import { describe, expect, it } from "vitest"
import * as lib from "../src/json"

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
