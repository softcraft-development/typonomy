import { describe, expect, it } from "vitest"
import { JsonParseError, parseJson, parseJsonArray, parseJsonCollection, parseJsonObject, toJson } from "../src/json"

describe("parseJson", () => {
  it("parses null", () => {
    expect(parseJson("null")).toBe(null)
  })

  it("throws JsonParseError for undefined", () => {
    expect(() => parseJson("undefined")).toThrowError(JsonParseError)
  })

  it("parses true", () => {
    expect(parseJson("true")).toBe(true)
  })

  it("parses false", () => {
    expect(parseJson("false")).toBe(false)
  })

  it("parses a number", () => {
    expect(parseJson("42.7")).toBe(42.7)
  })

  it("throws JsonParseError for Infinity", () => {
    expect(() => parseJson("Infinity")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for -Infinity", () => {
    expect(() => parseJson("-Infinity")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for NaN", () => {
    expect(() => parseJson("NaN")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for a string", () => {
    expect(() => parseJson("A String")).toThrowError(JsonParseError)
  })

  it("parses an empty array", () => {
    expect(parseJson("[]")).toEqual([])
  })

  it("parses an array of strings", () => {
    expect(parseJson("[\"a\", \"b\", \"c\"]")).toEqual(["a", "b", "c"])
  })

  it("throws JsonParseError for a malformed array", () => {
    expect(() => parseJson("[42,]")).toThrowError(JsonParseError)
  })

  it("parses an empty object", () => {
    expect(parseJson("{}")).toEqual({})
  })

  it("parses an object", () => {
    expect(parseJson("{\"key\": \"value\"}")).toEqual({ key: "value" })
  })

  it("throws JsonParseError for a malformed object", () => {
    expect(() => parseJson("{key: value}")).toThrowError(JsonParseError)
  })
})

describe("parseJsonArray", () => {
  it("throws JsonParseError for null", () => {
    expect(() => parseJsonArray("null")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for true", () => {
    expect(() => parseJsonArray("true")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for false", () => {
    expect(() => parseJsonArray("false")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for a number", () => {
    expect(() => parseJsonArray("42")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for a string", () => {
    expect(() => parseJsonArray("A String")).toThrowError(JsonParseError)
  })

  it("parses an empty array", () => {
    expect(parseJsonArray("[]")).toEqual([])
  })

  it("parses an array of strings", () => {
    expect(parseJsonArray("[\"a\", \"b\", \"c\"]")).toEqual(["a", "b", "c"])
  })

  it("throws JsonParseError for a malformed array", () => {
    expect(() => parseJsonArray("[42,]")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for an object", () => {
    expect(() => parseJsonArray("{\"key\": \"value\"}")).toThrowError(JsonParseError)
  })
})

describe("parseJsonCollection", () => {
  it("throws JsonParseError for null", () => {
    expect(() => parseJsonCollection("null")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for true", () => {
    expect(() => parseJsonCollection("true")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for false", () => {
    expect(() => parseJsonCollection("false")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for a number", () => {
    expect(() => parseJsonCollection("42")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for a string", () => {
    expect(() => parseJsonCollection("A String")).toThrowError(JsonParseError)
  })

  it("parses an empty array", () => {
    expect(parseJsonCollection("[]")).toEqual([])
  })

  it("parses an array of strings", () => {
    expect(parseJsonCollection("[\"a\", \"b\", \"c\"]")).toEqual(["a", "b", "c"])
  })

  it("throws JsonParseError for a malformed array", () => {
    expect(() => parseJsonCollection("[42,]")).toThrowError(JsonParseError)
  })

  it("parses an empty object", () => {
    expect(parseJsonCollection("{}")).toEqual({})
  })

  it("parses an object", () => {
    expect(parseJsonCollection("{\"key\": \"value\"}")).toEqual({ key: "value" })
  })

  it("throws JsonParseError for a malformed object", () => {
    expect(() => parseJsonCollection("{key: value}")).toThrowError(JsonParseError)
  })
})

describe("parseJsonObject", () => {
  it("throws JsonParseError for null", () => {
    expect(() => parseJsonObject("null")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for true", () => {
    expect(() => parseJsonObject("true")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for false", () => {
    expect(() => parseJsonObject("false")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for a number", () => {
    expect(() => parseJsonObject("42")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for a string", () => {
    expect(() => parseJsonObject("A String")).toThrowError(JsonParseError)
  })

  it("throws JsonParseError for an array", () => {
    expect(() => parseJsonObject("[\"a\", \"b\", \"c\"]")).toThrowError(JsonParseError)
  })

  it("parses an empty object", () => {
    expect(parseJsonObject("{}")).toEqual({})
  })

  it("parses an object", () => {
    expect(parseJsonObject("{\"key\": \"value\"}")).toEqual({ key: "value" })
  })

  it("throws JsonParseError for a malformed object", () => {
    expect(() => parseJsonObject("{key: value}")).toThrowError(JsonParseError)
  })
})

describe("parseJson", () => {
  it("parses null", () => {
    expect(toJson("null")).toBe(null)
  })

  it("returns undefined as a string", () => {
    expect(toJson("undefined")).toBe("undefined")
  })

  it("parses true", () => {
    expect(toJson("true")).toBe(true)
  })

  it("parses false", () => {
    expect(toJson("false")).toBe(false)
  })

  it("parses a number", () => {
    expect(toJson("42.7")).toBe(42.7)
  })

  it("returns Infinity as a string", () => {
    expect(toJson("Infinity")).toBe("Infinity")
  })

  it("returns -Infinity as a string", () => {
    expect(toJson("-Infinity")).toBe("-Infinity")
  })

  it("returns NaN as a string", () => {
    expect(toJson("NaN")).toBe("NaN")
  })

  it("returns a string", () => {
    expect(toJson("A String")).toBe("A String")
  })

  it("parses an empty array", () => {
    expect(toJson("[]")).toEqual([])
  })

  it("parses an array of strings", () => {
    expect(toJson("[\"a\", \"b\", \"c\"]")).toEqual(["a", "b", "c"])
  })

  it("returns a malformed array as string", () => {
    expect(toJson("[42,]")).toBe("[42,]")
  })

  it("parses an empty object", () => {
    expect(toJson("{}")).toEqual({})
  })

  it("parses an object", () => {
    expect(toJson("{\"key\": \"value\"}")).toEqual({ key: "value" })
  })

  it("returns a malformed object as string", () => {
    expect(toJson("{key: value}")).toBe("{key: value}")
  })
})

