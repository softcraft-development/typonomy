import { describe, expect, it } from "vitest"
import * as lib from "../../src/json"

describe("isJsonCollection", () => {
  it("is false for null", () => {
    expect(lib.isJsonCollection(null)).toBe(false)
  })

  it("is false for true", () => {
    expect(lib.isJsonCollection(true)).toBe(false)
  })

  it("is false for false", () => {
    expect(lib.isJsonCollection(false)).toBe(false)
  })

  it("is false for a number", () => {
    expect(lib.isJsonCollection(42)).toBe(false)
  })

  it("is false for a string", () => {
    expect(lib.isJsonCollection("A String")).toBe(false)
  })

  it("is true for an array of Json", () => {
    expect(lib.isJsonCollection([
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
    expect(lib.isJsonCollection([42, undefined])).toBe(false)
  })

  it("is true for an object of Json", () => {
    expect(lib.isJsonCollection({
      array: [42],
      boolean: true,
      null: null,
      number: 42,
      object: { key: "value" },
      string: "A String",
    })).toBe(true)
  })

  it("is false for an object with any non-Json", () => {
    expect(lib.isJsonCollection({
      number: 42,
      object: { key: undefined },
    })).toBe(false)
  })
})

describe("parseJsonCollection", () => {
  it("throws JsonParseError for null", () => {
    expect(() => lib.parseJsonCollection("null")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for true", () => {
    expect(() => lib.parseJsonCollection("true")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for false", () => {
    expect(() => lib.parseJsonCollection("false")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for a number", () => {
    expect(() => lib.parseJsonCollection("42")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for a string", () => {
    expect(() => lib.parseJsonCollection("A String")).toThrowError(lib.JsonParseError)
  })

  it("parses an empty array", () => {
    expect(lib.parseJsonCollection("[]")).toEqual([])
  })

  it("parses an array of strings", () => {
    expect(lib.parseJsonCollection("[\"a\", \"b\", \"c\"]")).toEqual(["a", "b", "c"])
  })

  it("throws JsonParseError for a malformed array", () => {
    expect(() => lib.parseJsonCollection("[42,]")).toThrowError(lib.JsonParseError)
  })

  it("parses an empty object", () => {
    expect(lib.parseJsonCollection("{}")).toEqual({})
  })

  it("parses an object", () => {
    expect(lib.parseJsonCollection("{\"key\": \"value\"}")).toEqual({ key: "value" })
  })

  it("throws JsonParseError for a malformed object", () => {
    expect(() => lib.parseJsonCollection("{key: value}")).toThrowError(lib.JsonParseError)
  })
})
