import * as lib from "@/func"
import { valueToString } from "@/strings"

describe("func", () => {
  describe("compose", () => {
    it("creates a transform from the input to result type", () => {
      const countCharacters = (value: string) => value.length
      const composed = lib.compose(countCharacters, valueToString)
      expect(composed("Hello")).toBe("5")
    })
  })

  describe("composeReducer", () => {
    it("creates a new reducer via the synthesis function", () => {
      const concat = (state: string, value: number) => `${state}->${value}`
      const double = (value: number) => value * 2
      const reducer = lib.composeReducer(concat, double)
      expect(reducer("Start", 3, "")).toEqual("Start->6")
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
