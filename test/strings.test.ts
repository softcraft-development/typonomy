import { describe, expect, it } from "vitest"
import * as lib from "../src/strings"

describe("strings", () => {
  describe("reduceCharacters", () => {
    it("reduce the characters in the string", () => {
      const reducer = (state: string, value: string, index: number) => `${state} ${index}:${value}`
      expect(lib.reduceCharacters("abcd", reducer, "Initial")).toEqual("Initial 0:a 1:b 2:c 3:d")
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
})
