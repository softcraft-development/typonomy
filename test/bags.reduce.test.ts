import { describe, expect, it } from "vitest"
import * as lib from "../src/bags"
import { Break } from "../src/break"
import { isUndefined } from "../src/nullish"
import type { Optional } from "../src/types"

describe("reduceBag", () => {
  const reducer = (state: string, value: Optional<number>, index: number) => {
    return `${state}->${index}:${isUndefined(value) ? "Undefined" : value.toString()}`
  }
  const breakExecution = () => {
    throw Break
  }

  describe("with a single value", () => {
    it("reduces the value with an index of 0", () => {
      const result = lib.reduceBag(42, reducer, "initial")
      expect(result).toBe("initial->0:42")
    })

    describe("when the reducer breaks execution", () => {
      it("returns the initial state", () => {
        const initial = { value: "Initial" }
        const result = lib.reduceBag(42, breakExecution, initial)
        expect(result).toBe(initial)
      })
    })
  })

  describe("with a single value", () => {
    it("reduces the value with an index of 0", () => {
      const result = lib.reduceBag(undefined, reducer, "initial")
      expect(result).toBe("initial->0:Undefined")
    })

    describe("when the reducer breaks execution", () => {
      it("returns the initial state", () => {
        const initial = { value: "Initial" }
        const result = lib.reduceBag(undefined, breakExecution, initial)
        expect(result).toBe(initial)
      })
    })
  })

  describe("with an array of values", () => {
    it("reduces the each element", () => {
      const result = lib.reduceBag([3, 5, 7], reducer, "initial")
      expect(result).toBe("initial->0:3->1:5->2:7")
    })

    describe("when the reducer breaks execution", () => {
      it("reduces only the prior values", () => {
        const result = lib.reduceBag([3, 5, 7], (state, value, index) => {
          if (index === 1) throw Break
          return reducer(state, value, index)
        }, "initial")
        expect(result).toBe("initial->0:3")
      })
    })
  })
})
