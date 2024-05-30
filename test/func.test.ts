import * as lib from "src/func"
import { valueToString } from "src/strings"

describe("func", () => {
  describe("compose", () => {
    it("creates a transform from the input to result type", () => {
      const toIntermediate = (value: string) => value.length
      const toResult = valueToString
      const composed = lib.compose(toIntermediate, toResult)
      expect(composed("Hello")).toBe("5")
    })
  })

  describe("composeDown", () => {
    it("creates a new synthesis from a synthesis and a transform for the result", () => {
      const intermediate = (a: number, b: number): number => a + b
      const transform = valueToString
      const synthesis = lib.composeDown(intermediate, transform)
      expect(synthesis(3, 5)).toEqual("8")
    })
  })

  describe("composeLeft", () => {
    it("creates a new synthesis from a synthesis and a transform for the left type", () => {
      const intermediate = (a: number, b: number): number => a + b
      const transform = (value: string) => parseInt(value, 10)
      const synthesis = lib.composeLeft(transform, intermediate)
      expect(synthesis("7", 11)).toEqual(18)
    })
  })

  describe("composeReducer", () => {
    it("creates a new reducer via the synthesis function", () => {
      const synthesis = (value: number, key: string): string => valueToString(value + key.length)
      const reduceIntermediate = (state: string, value: string, key: string): string => `${state} ${key}=${value}`
      const reducer = lib.composeReducer(synthesis, reduceIntermediate)
      expect(reducer("Start", 3, "test")).toEqual("Start test=7")
    })
  })

  describe("composeRight", () => {
    it("creates a new synthesis from a synthesis and a transform for the right type", () => {
      const transform = (value: string) => parseInt(value, 10)
      const intermediate = (a: number, b: number): number => a + b
      const synthesis = lib.composeRight(transform, intermediate)
      expect(synthesis(13, "17")).toEqual(30)
    })
  })

  describe("reiterate", () => {
    it("should return the initial state when count is 0", () => {
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
