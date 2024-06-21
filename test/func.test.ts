import { describe, expect, it } from "vitest"
import * as lib from "../src/func"
import { isObject } from "../src/objects"
import { isString, valueToString } from "../src/strings"
import { isNumber } from "../src/types"

describe("func", () => {
  describe("and", () => {
    it("returns true if both input Predicates are true", () => {
      const a = isNumber
      const b = (value: unknown) => String(value) === "42"
      const combined = lib.and(a, b)
      expect(combined(42)).toBe(true)
    })

    it("returns true if both input Predicates are true", () => {
      const a = isNumber
      const b = (value: unknown) => String(value) === "42"
      const combined = lib.and(a, b)
      expect(combined(17)).toBe(false)
    })
  })

  describe("all", () => {
    it("returns true if all input Predicates are true", () => {
      const a = isNumber
      const b = (value: unknown) => String(value).length == 2
      const c = (value: unknown) => String(value)[0] === "1"
      const combined = lib.all(a, b, c)
      expect(combined(10)).toBe(true)
    })

    it("returns false if any input Predicates are false", () => {
      const a = isNumber
      const b = (value: unknown) => String(value).length == 2
      const c = (value: unknown) => String(value)[0] === "1"
      const combined = lib.all(a, b, c)
      expect(combined("10")).toBe(false)
    })
  })

  describe("any", () => {
    it("returns true if any input Predicates is true", () => {
      const combined = lib.any(isObject, value => value === 37, value => value === "42")
      expect(combined({})).toBe(true)
    })

    it("returns false if all input Predicates is true", () => {
      const combined = lib.any(isObject, value => value === 37, value => value === "42")
      expect(combined("37")).toBe(false)
    })
  })

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

  describe("not", () => {
    it("returns the negation of the input Predicate", () => {
      const negatedGuard = lib.not(isString)
      expect(negatedGuard("hello")).toBe(false)
    })
  })

  describe("or", () => {
    it("returns true if either input Predicate are true", () => {
      const typeGuard1 = (value: unknown) => typeof value === "string"
      const typeGuard2 = (value: unknown) => typeof value === "number"
      const combinedGuard = lib.or(typeGuard1, typeGuard2)
      expect(combinedGuard("hello")).toBe(true)
    })

    it("returns false if both input Predicate are false", () => {
      const typeGuard1 = (value: unknown) => typeof value === "string"
      const typeGuard2 = (value: unknown) => typeof value === "number"
      const combinedGuard = lib.or(typeGuard1, typeGuard2)
      expect(combinedGuard(true)).toBe(false)
    })
  })

  describe("reiterate", () => {
    it("returns the initial state when count is 0", () => {
      const initialState = { key: "Initial state" }
      const result = lib.reiterate(0, () => {
        return { key: "Not the initial state" }
      }, initialState)
      expect(result).toBe(initialState)
    })

    it("should apply the reducer function the specified number of times", () => {
      const result = lib.reiterate(3, (state, value, key) => {
        state.calls.push(value)
        return state
      }, { calls: new Array<number>() })
      expect(result.calls).toEqual([1, 2, 3])
    })
  })
})
