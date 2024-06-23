import { beforeEach, describe, expect, it } from "vitest"
import * as lib from "../src/func"
import type { Optional } from "../src/nullish"
import { isObject } from "../src/objects"
import { isString, valueToString } from "../src/strings"
import { isNumber } from "../src/types"

describe("func", () => {
  describe("BreakException", () => {
    describe("toString", () => {
      it("returns the message", () => {
        expect(new lib.BreakExecution("Test Message").toString()).toEqual("Test Message")
      })
    })
  })

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

  describe("isBreakExecution", () => {
    it("returns true for a BreakExecution", () => {
      expect(lib.isBreakExecution(new lib.BreakExecution())).toBe(true)
    })

    it("returns true for Break", () => {
      expect(lib.isBreakExecution(lib.Break)).toBe(true)
    })

    it("returns false for an Error", () => {
      expect(lib.isBreakExecution(new Error())).toBe(false)
    })

    it("returns false for undefined", () => {
      expect(lib.isBreakExecution(undefined)).toBe(false)
    })

    it("returns false for null", () => {
      expect(lib.isBreakExecution(null)).toBe(false)
    })

    it("returns false for an object with a message", () => {
      expect(lib.isBreakExecution({ message: "Test" })).toBe(false)
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

  describe("onBreakExecution", () => {
    it("returns the return value for a BreakExecution", () => {
      const value = { key: "Test" }
      expect(lib.onBreakExecution(lib.Break, value)).toBe(value)
    })

    it("throws anything other than a BreakExecution", () => {
      const exception = new Error("Test")
      expect(() => lib.onBreakExecution(exception, "whatever")).toThrow(exception)
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

  describe("reduceIndexed", () => {
    let indexed: lib.Indexed<string>
    let reducer: lib.Reducer<string, Optional<string>, number>

    beforeEach(() => {
      indexed = {
        0: "Zero",
        1: "One",
        2: "Two",
        3: "Three",
      }
      reducer = (state, value, index) => `${state} ${index}:${value}`
    })

    it("reduces an index of values", () => {
      expect(lib.reduceIndexed(indexed, 1, 3, reducer, "Initial")).toBe("Initial 1:One 2:Two 3:Three")
    })

    describe("when the index is non-sequential", () => {
      it("passes undefined as the value", () => {
        expect(lib.reduceIndexed(
          indexed,
          2,
          4,
          (state, value, index) => `${state} ${index}:${value}`,
          "Initial"
        )).toBe("Initial 2:Two 3:Three 4:undefined")
      })
    })

    describe("when the reducer breaks on the first element", () => {
      it("returns the initial state", () => {
        const initial = { lastIndex: -1, value: "Initial" }
        type State = typeof initial
        const breakingReducer = (_state: unknown, _value: Optional<string>, index: number) => {
          if (index === 0) throw lib.Break
          throw new Error("Should never get past the first index")
        }
        const result = lib.reduceIndexed<State, string>(indexed, 0, 3, breakingReducer, initial)
        expect(result).toBe(initial)
      })
    })

    describe("when the reducer breaks on a subsequent element", () => {
      it("does not continue to reduce", () => {
        const initial = { lastIndex: -1, value: "Initial" }
        type State = typeof initial
        const breakingReducer = (_state: unknown, value: Optional<string>, index: number) => {
          if (index === 2) throw lib.Break
          return {
            lastIndex: index,
            value: value || "Not Defined",
          }
        }
        const result = lib.reduceIndexed<State, string>(indexed, 0, 3, breakingReducer, initial)
        expect(result).toEqual({ lastIndex: 1, value: "One" })
      })
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

    it("reduces the given number of times", () => {
      const reducer = (state: number, value: number) => state + value
      const result = lib.reiterate(3, reducer, 101)
      expect(result).toEqual(101 + 1 + 2 + 3)
    })

    describe("when the reducer breaks", () => {
      it("does not continue to reduce", () => {
        const reducer = (state: number, value: number) => {
          if (state >= 102) throw lib.Break
          return state + value
        }
        const result = lib.reiterate(97, reducer, 101)
        expect(result).toEqual(101 + 1)
      })
    })
  })

  describe("thunk", () => {
    it("returns the value", () => {
      const value = { key: "Test" }
      expect(lib.thunk(value)()).toBe(value)
    })
  })
})
