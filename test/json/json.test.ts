import { describe, expect, it } from "vitest"
import * as lib from "../../src/json"

describe("isJson", () => {
  it("is true for null", () => {
    expect(lib.isJson(null)).toBe(true)
  })

  it("is false for undefined", () => {
    expect(lib.isJson(undefined)).toBe(false)
  })

  it("is true for true", () => {
    expect(lib.isJson(true)).toBe(true)
  })

  it("is true for false", () => {
    expect(lib.isJson(false)).toBe(true)
  })

  it("is true for a number", () => {
    expect(lib.isJson(42)).toBe(true)
  })

  it("is false for NaN", () => {
    expect(lib.isJson(NaN)).toBe(false)
  })

  it("is false for Infinity", () => {
    expect(lib.isJson(Infinity)).toBe(false)
  })

  it("is false for -Infinity", () => {
    expect(lib.isJson(-Infinity)).toBe(false)
  })

  it("is true for a string", () => {
    expect(lib.isJson("A String")).toBe(true)
  })

  it("is true for an array of Json", () => {
    expect(lib.isJson([
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
    expect(lib.isJson([42, undefined])).toBe(false)
  })

  it("is true for an object of Json", () => {
    expect(lib.isJson({
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

describe("parseJson", () => {
  it("parses null", () => {
    expect(lib.parseJson("null")).toBe(null)
  })

  it("throws JsonParseError for undefined", () => {
    expect(() => lib.parseJson("undefined")).toThrowError(lib.JsonParseError)
  })

  it("parses true", () => {
    expect(lib.parseJson("true")).toBe(true)
  })

  it("parses false", () => {
    expect(lib.parseJson("false")).toBe(false)
  })

  it("parses a number", () => {
    expect(lib.parseJson("42.7")).toBe(42.7)
  })

  it("throws JsonParseError for Infinity", () => {
    expect(() => lib.parseJson("Infinity")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for -Infinity", () => {
    expect(() => lib.parseJson("-Infinity")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for NaN", () => {
    expect(() => lib.parseJson("NaN")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for a string", () => {
    expect(() => lib.parseJson("A String")).toThrowError(lib.JsonParseError)
  })

  it("parses an empty array", () => {
    expect(lib.parseJson("[]")).toEqual([])
  })

  it("parses an array of strings", () => {
    expect(lib.parseJson("[\"a\", \"b\", \"c\"]")).toEqual(["a", "b", "c"])
  })

  it("throws JsonParseError for a malformed array", () => {
    expect(() => lib.parseJson("[42,]")).toThrowError(lib.JsonParseError)
  })

  it("parses an empty object", () => {
    expect(lib.parseJson("{}")).toEqual({})
  })

  it("parses an object", () => {
    expect(lib.parseJson("{\"key\": \"value\"}")).toEqual({ key: "value" })
  })

  it("throws JsonParseError for a malformed object", () => {
    expect(() => lib.parseJson("{key: value}")).toThrowError(lib.JsonParseError)
  })
})

describe("toJson", () => {
  it("parses null", () => {
    expect(lib.toJson("null")).toBe(null)
  })

  it("returns undefined as a string", () => {
    expect(lib.toJson("undefined")).toBe("undefined")
  })

  it("parses true", () => {
    expect(lib.toJson("true")).toBe(true)
  })

  it("parses false", () => {
    expect(lib.toJson("false")).toBe(false)
  })

  it("parses a number", () => {
    expect(lib.toJson("42.7")).toBe(42.7)
  })

  it("returns Infinity as a string", () => {
    expect(lib.toJson("Infinity")).toBe("Infinity")
  })

  it("returns -Infinity as a string", () => {
    expect(lib.toJson("-Infinity")).toBe("-Infinity")
  })

  it("returns NaN as a string", () => {
    expect(lib.toJson("NaN")).toBe("NaN")
  })

  it("returns a string", () => {
    expect(lib.toJson("A String")).toBe("A String")
  })

  it("parses an empty array", () => {
    expect(lib.toJson("[]")).toEqual([])
  })

  it("parses an array of strings", () => {
    expect(lib.toJson("[\"a\", \"b\", \"c\"]")).toEqual(["a", "b", "c"])
  })

  it("returns a malformed array as string", () => {
    expect(lib.toJson("[42,]")).toBe("[42,]")
  })

  it("parses an empty object", () => {
    expect(lib.toJson("{}")).toEqual({})
  })

  it("parses an object", () => {
    expect(lib.toJson("{\"key\": \"value\"}")).toEqual({ key: "value" })
  })

  it("returns a malformed object as string", () => {
    expect(lib.toJson("{key: value}")).toBe("{key: value}")
  })
})
