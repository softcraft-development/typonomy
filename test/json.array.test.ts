import { describe, expect, it } from "vitest"
import * as lib from "../src/json"

describe("parseJsonArray", () => {
  it("throws JsonParseError for null", () => {
    expect(() => lib.parseJsonArray("null")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for true", () => {
    expect(() => lib.parseJsonArray("true")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for false", () => {
    expect(() => lib.parseJsonArray("false")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for a number", () => {
    expect(() => lib.parseJsonArray("42")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for a string", () => {
    expect(() => lib.parseJsonArray("A String")).toThrowError(lib.JsonParseError)
  })

  it("parses an empty array", () => {
    expect(lib.parseJsonArray("[]")).toEqual([])
  })

  it("parses an array of strings", () => {
    expect(lib.parseJsonArray("[\"a\", \"b\", \"c\"]")).toEqual(["a", "b", "c"])
  })

  it("throws JsonParseError for a malformed array", () => {
    expect(() => lib.parseJsonArray("[42,]")).toThrowError(lib.JsonParseError)
  })

  it("throws JsonParseError for an object", () => {
    expect(() => lib.parseJsonArray("{\"key\": \"value\"}")).toThrowError(lib.JsonParseError)
  })
})
