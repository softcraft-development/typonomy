import { describe, expect, it } from "vitest"
import * as lib from "../src/fp"
import { valueToString } from "../src/strings"
import { isEquality, isString } from "../src/typeGuards"

describe("fp", () => {
  describe("compose", () => {
    it("creates a transform from the input to result type", () => {
      const toIntermediate = (value: string) => value.length
      const toResult = valueToString
      const composed = lib.compose(toIntermediate, toResult)
      expect(composed("Hello")).toBe("5")
    })
  })

  describe("composeDown", () => {
    it("creates a new Combine from a Combine and a transform for the result", () => {
      const intermediate = (a: number, b: number): number => a + b
      const transform = valueToString
      const combine = lib.composeDown(intermediate, transform)
      expect(combine(3, 5)).toEqual("8")
    })
  })

  describe("composeLeft", () => {
    it("creates a new Combine from a Combine and a transform for the left type", () => {
      const intermediate = (a: number, b: number): number => a + b
      const transform = (value: string) => parseInt(value, 10)
      const combine = lib.composeLeft(transform, intermediate)
      expect(combine("7", 11)).toEqual(18)
    })
  })

  describe("composeReducer", () => {
    it("creates a new reducer via the Combine function", () => {
      const combine = (value: number, key: string): string => valueToString(value + key.length)
      const reduceIntermediate = (state: string, value: string, key: string): string => `${state} ${key}=${value}`
      const reducer = lib.composeReducer(combine, reduceIntermediate)
      expect(reducer("Start", 3, "test")).toEqual("Start test=7")
    })
  })

  describe("composeRight", () => {
    it("creates a new Combine from a Combine and a transform for the right type", () => {
      const transform = (value: string) => parseInt(value, 10)
      const intermediate = (a: number, b: number): number => a + b
      const combine = lib.composeRight(transform, intermediate)
      expect(combine(13, "17")).toEqual(30)
    })
  })

  describe("isEquality", () => {
    it("returns true if the values are equal", () => {
      expect(isEquality(42, 42)).toBe(true)
    })

    it("returns true if the values are the same string", () => {
      expect(isEquality("42", "42")).toBe(true)
    })

    it("returns true if both values are undefined", () => {
      expect(isEquality(undefined, undefined)).toBe(true)
    })

    it("returns true if both values are null", () => {
      expect(isEquality(null, null)).toBe(true)
    })

    it("returns true if both values are Infinity", () => {
      expect(isEquality(Infinity, Infinity)).toBe(true)
    })

    it("returns false if both values are NaN", () => {
      expect(isEquality(NaN, NaN)).toBe(false)
    })

    it("returns false if the values are symbols", () => {
      expect(isEquality(Symbol("test"), Symbol("test"))).toBe(false)
    })

    it("returns false if the values are different objects", () => {
      expect(isEquality({ key: "test" }, { key: "test" })).toBe(false)
    })

    it("returns false if the values are not equal", () => {
      expect(isEquality<unknown>(42, "42")).toBe(false)
    })
  })

  describe("isString", () => {
    it("returns true for a string", () => {
      const result = isString("Hello")
      expect(result).toBe(true)
    })

    it("returns false for a number", () => {
      const result = isString(42)
      expect(result).toBe(false)
    })

    it("returns false for a boolean", () => {
      const result = isString(true)
      expect(result).toBe(false)
    })

    it("returns false for an object", () => {
      const result = isString({ toString: () => "Value of Object" })
      expect(result).toBe(false)
    })

    it("returns false for null", () => {
      const result = isString(null)
      expect(result).toBe(false)
    })

    it("returns false for undefined", () => {
      const result = isString(undefined)
      expect(result).toBe(false)
    })

    it("returns false for a symbol", () => {
      const result = isString(Symbol("Test Symbol"))
      expect(result).toBe(false)
    })
  })

  describe("partial", () => {
    it("partially applies a value to the parameter of a Transform", () => {
      const thunk = lib.partial(valueToString, 23)
      expect(thunk()).toBe("23")
    })
  })

  describe("partialLeft", () => {
    it("partially applies a parameter to the left parameter of a Combine", () => {
      const divide = (a: number, b: number) => a / b
      const invert = lib.partialLeft(divide, 1)
      expect(invert(10)).toBe(0.1)
    })
  })

  describe("partialRight", () => {
    it("partially applies a parameter to the right parameter of a Combine", () => {
      const divide = (a: number, b: number) => a / b
      const half = lib.partialRight(divide, 2)
      expect(half(6)).toBe(3)
    })
  })

  describe("thunk", () => {
    it("returns the value", () => {
      const value = { key: "Test" }
      expect(lib.thunk(value)()).toBe(value)
    })
  })
})