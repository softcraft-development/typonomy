import { describe, expect, it } from "vitest"
import { reduceBag } from "../../src/bags"
import * as lib from "../../src/strings"

describe("concat", () => {
  it("should concatenate two strings", () => {
    const result = lib.concat("Hello", "World")
    expect(result).toBe("HelloWorld")
  })

  it("should return the first string if the second string is empty", () => {
    const result = lib.concat("Hello", "")
    expect(result).toBe("Hello")
  })

  it("should return the first string if the second string is null", () => {
    const result = lib.concat("Hello", null)
    expect(result).toBe("Hello")
  })

  it("should return the first string if the second string is undefined", () => {
    const result = lib.concat("Hello", undefined)
    expect(result).toBe("Hello")
  })

  it("can be used as a reducer", () => {
    expect(reduceBag(["a", "b", null, "c", "d"], lib.concat, "Start:")).toBe("Start:abcd")
  })
})

describe("isString", () => {
  it("returns true for a string", () => {
    const result = lib.isString("Hello")
    expect(result).toBe(true)
  })

  it("returns false for a number", () => {
    const result = lib.isString(42)
    expect(result).toBe(false)
  })

  it("returns false for a boolean", () => {
    const result = lib.isString(true)
    expect(result).toBe(false)
  })

  it("returns false for an object", () => {
    const result = lib.isString({ toString: () => "Value of Object" })
    expect(result).toBe(false)
  })

  it("returns false for null", () => {
    const result = lib.isString(null)
    expect(result).toBe(false)
  })

  it("returns false for undefined", () => {
    const result = lib.isString(undefined)
    expect(result).toBe(false)
  })

  it("returns false for a symbol", () => {
    const result = lib.isString(Symbol("Test Symbol"))
    expect(result).toBe(false)
  })
})

describe("valueToString", () => {
  it("should convert a number to a string", () => {
    const result = lib.valueToString(42)
    expect(result).toBe("42")
  })

  it("should convert a string to a string", () => {
    const result = lib.valueToString("Hello")
    expect(result).toBe("Hello")
  })

  it("should convert a boolean to a string", () => {
    const result = lib.valueToString(true)
    expect(result).toBe("true")
  })

  it("should convert an object to a string via its toString() function", () => {
    const result = lib.valueToString({ toString: () => "Value of Object" })
    expect(result).toBe("Value of Object")
  })

  it("should convert null to a string", () => {
    const result = lib.valueToString(null)
    expect(result).toBe("null")
  })

  it("should convert undefined to a string", () => {
    const result = lib.valueToString(undefined)
    expect(result).toBe("undefined")
  })

  it("should convert a symbol to a string", () => {
    const result = lib.valueToString(Symbol("Test Symbol"))
    expect(result).toBe("Symbol(Test Symbol)")
  })
})
