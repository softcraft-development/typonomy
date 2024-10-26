import { describe, expect, it } from "vitest"
import * as lib from "../../src/bags"
import { Break } from "../../src/break"
import { isUndefined } from "../../src/nullish"
import type { Optional } from "../../src/types"

describe("mapBag", () => {
  const mapper = (value: Optional<number>, index: number) => {
    return `${index}:${isUndefined(value) ? "Undefined" : value.toString()}`
  }
  const breakExecution = () => {
    throw Break
  }
  describe("with a single value", () => {
    it("should return the mapped value with index 0", () => {
      const result = lib.mapBag(42, mapper)
      expect(result).toBe("0:42")
    })

    describe("when the mapper breaks execution", () => {
      it("should return undefined", () => {
        expect(lib.mapBag(42, breakExecution)).toBeUndefined()
      })
    })
  })

  describe("with a single value", () => {
    it("should return the mapped value with index 0", () => {
      const result = lib.mapBag(undefined, mapper)
      expect(result).toEqual("0:Undefined")
    })

    describe("when the mapper breaks execution", () => {
      it("should return undefined", () => {
        expect(lib.mapBag(undefined, breakExecution)).toBeUndefined()
      })
    })
  })

  describe("with a single value", () => {
    it("should return an array of mapped values", () => {
      const result = lib.mapBag([3, 5, 7], mapper)
      expect(result).toEqual(["0:3", "1:5", "2:7"])
    })

    describe("when the mapper breaks execution", () => {
      it("should map only the prior values", () => {
        const result = lib.mapBag([3, 5, 7], (value, index) => {
          if (index === 1) throw Break
          return mapper(value, index)
        })
        expect(result).toEqual(["0:3"])
      })
    })
  })
})
