import { describe, expect, it } from "vitest"
import * as lib from "../../src/json"

describe("isJsonObject", () => {
  it("is false for null", () => {
    expect(lib.isJsonObject(null)).toBe(false)
  })

  it("is false for true", () => {
    expect(lib.isJsonObject(true)).toBe(false)
  })

  it("is false for false", () => {
    expect(lib.isJsonObject(false)).toBe(false)
  })

  it("is false for a number", () => {
    expect(lib.isJsonObject(42)).toBe(false)
  })

  it("is false for a string", () => {
    expect(lib.isJsonObject("A String")).toBe(false)
  })

  it("is false for an array of Json", () => {
    expect(lib.isJsonObject([
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
    ])).toBe(false)
  })

  it("is true for an object of Json", () => {
    expect(lib.isJsonObject({
      array: [42],
      boolean: true,
      null: null,
      number: 42,
      object: { key: "value" },
      string: "A String",
    })).toBe(true)
  })

  it("is false for an object with any non-Json", () => {
    expect(lib.isJson({
      number: 42,
      object: { key: undefined },
    })).toBe(false)
  })
})

describe("parseJsonObject", () => {
  it("throws JsonParseError for null", () => {
    expect(() => lib.parseJsonObject("null")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for true", () => {
    expect(() => lib.parseJsonObject("true")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for false", () => {
    expect(() => lib.parseJsonObject("false")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for a number", () => {
    expect(() => lib.parseJsonObject("42")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for a string", () => {
    expect(() => lib.parseJsonObject("A String")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for an array", () => {
    expect(() => lib.parseJsonObject("[\"a\", \"b\", \"c\"]")).toThrowError(lib.JsonParseError)
  })

  it("parses an empty object", () => {
    expect(lib.parseJsonObject("{}")).toEqual({})
  })

  it("parses an object", () => {
    expect(lib.parseJsonObject("{\"key\": \"value\"}")).toEqual({ key: "value" })
  })

  it("throws JsonParseError for a malformed object", () => {
    expect(() => lib.parseJsonObject("{key: value}")).toThrowError(lib.JsonParseError)
  })
})
