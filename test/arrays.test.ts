import { describe, expect, it, vi } from "vitest"
import * as lib from "../src/arrays"
import type { Explicit } from "../src/nullish"
import { isNumber } from "../src/types"

describe("arrays", () => {
  describe("Explicit<T>", () => {
    it("is assignable to T", () => {
      const explicitType: Explicit<number> = 42
      const generalType: number = explicitType
      expect(generalType).toBe(explicitType)
    })
  })

  describe("append", () => {
    it("should append the value to the array", () => {
      const array = [1, 1, 2, 3]
      const result = lib.append(array, 5)
      expect(result).toEqual([1, 1, 2, 3, 5])
    })

    it("should mutate the original array", () => {
      const array = [1, 1, 2, 3]
      const result = lib.append(array, 7)
      expect(result).toBe(array)
    })
  })

  describe("appendExplicit", () => {
    it("appends a definite value", () => {
      const result = lib.appendExplicit<string>([], "Explicit")
      expect(result).toEqual(["Explicit"])
    })

    it("does not append a null", () => {
      const result = lib.appendExplicit<string>([], null)
      expect(result).toEqual([])
    })

    it("does not append undefined", () => {
      const result = lib.appendExplicit<string>([], undefined)
      expect(result).toEqual([])
    })
  })

  describe("appendSome", () => {
    it("should append a single value to the array", () => {
      const array = [1, 2, 3]
      const result = lib.appendSome(array, 4)
      expect(result).toEqual([1, 2, 3, 4])
    })

    it("should append an array of values to the array", () => {
      const array = [1, 2, 3]
      const result = lib.appendSome(array, [4, 5])
      expect(result).toEqual([1, 2, 3, 4, 5])
    })

    it("should append an empty array to the array", () => {
      const array = [1, 2, 3]
      const result = lib.appendSome(array, [])
      expect(result).toEqual([1, 2, 3])
    })

    it("should append null to the array", () => {
      const array = [1, 2, 3]
      const result = lib.appendSome(array, null)
      expect(result).toEqual([1, 2, 3, null])
    })

    it("should append undefined to the array", () => {
      const array = [1, 2, 3]
      const result = lib.appendSome(array, undefined)
      expect(result).toEqual([1, 2, 3, undefined])
    })
  })

  describe("arrayGuard", () => {
    describe("when emptyMatches is true", () => {
      it("returns a type guard that returns true for an empty array", () => {
        expect(lib.arrayGuard(isNumber, true)([])).toBe(true)
      })
    })

    describe("when emptyMatches is false", () => {
      it("returns a type guard that returns false for an empty array", () => {
        expect(lib.arrayGuard(isNumber, false)([])).toBe(false)
      })
    })

    it("returns a type guard that validates against the predicate", () => {
      expect(lib.arrayGuard(isNumber)([1, 2, 3])).toBe(true)
    })
  })

  describe("arrayOf", () => {
    it("returns an array of the specified size", () => {
      const result = lib.arrayOf(5)
      expect(result.length).toBe(5)
    })

    it("returns an empty array if no size is specified", () => {
      const result = lib.arrayOf()
      expect(result.length).toBe(0)
    })
  })

  describe("forSome", () => {
    it("should apply the callback to a single value", () => {
      const callback = vi.fn<[number, number], void>()
      lib.forSome(19, callback)
      expect(callback).toHaveBeenCalledWith(19, 0)
    })

    it("should apply the callback to all array elements", () => {
      const callback = vi.fn<[number, number], void>()
      lib.forSome([3, 5, 7], callback)
      expect(callback).toHaveBeenNthCalledWith(1, 3, 0)
      expect(callback).toHaveBeenNthCalledWith(2, 5, 1)
      expect(callback).toHaveBeenNthCalledWith(3, 7, 2)
    })
  })

  describe("isArrayOf", () => {
    describe("when the value is an empty array", () => {
      describe("and emptyMatches is true", () => {
        it("returns true", () => {
          expect(lib.isArrayOf([], isNumber, true)).toBe(true)
        })
      })

      describe("and emptyMatches is false", () => {
        it("returns false", () => {
          expect(lib.isArrayOf([], isNumber, false)).toBe(false)
        })
      })
    })

    describe("when the value is an filled array", () => {
      describe("and the array contains only values of that type", () => {
        it("returns true", () => {
          expect(lib.isArrayOf([1, 2, 3], isNumber)).toBe(true)
        })
      })

      describe("and the array contains any values not of that type", () => {
        it("returns false", () => {
          expect(lib.isArrayOf([1, 2, "3"], isNumber)).toBe(false)
        })
      })
    })

    it("returns false if the value is of the array type", () => {
      expect(lib.isArrayOf(1, isNumber)).toBe(false)
    })

    it("returns false for null", () => {
      expect(lib.isArrayOf(null, isNumber)).toBe(false)
    })

    it("returns false for null", () => {
      expect(lib.isArrayOf(undefined, isNumber)).toBe(false)
    })

    it("returns false for a string", () => {
      expect(lib.isArrayOf("test", isNumber)).toBe(false)
    })

    it("returns false for an object", () => {
      expect(lib.isArrayOf({}, isNumber)).toBe(false)
    })
  })

  describe("isEmptyArray", () => {
    it("returns true for an empty array", () => {
      expect(lib.isEmptyArray([])).toBe(true)
    })

    it("returns false a filled Array", () => {
      expect(lib.isEmptyArray([1, 2])).toBe(false)
    })

    it("returns false for null", () => {
      expect(lib.isEmptyArray(null)).toBe(false)
    })

    it("returns false for undefined", () => {
      expect(lib.isEmptyArray(undefined)).toBe(false)
    })
  })

  describe("isPlural", () => {
    it("returns true if the value is an array", () => {
      expect(lib.isPlural([1, 2, 3])).toBe(true)
    })

    it("returns false if the value is not an array", () => {
      expect(lib.isPlural(42)).toBe(false)
    })
  })

  describe("isSingular", () => {
    it("returns false if the value is an array", () => {
      expect(lib.isSingular([1, 2, 3])).toBe(false)
    })

    it("returns true if the value is not an array", () => {
      expect(lib.isSingular(42)).toBe(true)
    })
  })

  describe("fill", () => {
    it("should fill the array with values generated by the filler function", () => {
      const filler = (value: number) => value * 2
      const result = lib.fill(4, filler)
      expect(result).toEqual([2, 4, 6, 8])
    })
  })

  describe("mapSome", () => {
    it("should transform a single value", () => {
      const value = 42
      const transform = (value: number) => value.toString()
      const result = lib.mapSome(value, transform)
      expect(result).toBe("42")
    })

    it("should map an array of values", () => {
      const value = [1, 2, 3]
      const transform = (value: number) => value.toString()
      const result = lib.mapSome(value, transform)
      expect(result).toEqual(["1", "2", "3"])
    })

    it("should map a single value with an index of 0", () => {
      const result = lib.mapSome(-1, (value, index) => `${value}:${index}`)
      expect(result).toBe("-1:0")
    })
  })

  describe("reduceSome", () => {
    it("should reduce a single value", () => {
      const result = lib.reduceSome(42, (state, value) => state + value, 17)
      expect(result).toBe(42 + 17)
    })

    it("should reduce an array of values", () => {
      const result = lib.reduceSome([1, 3, 5], (state, value) => state + value, 7)
      expect(result).toBe(1 + 3 + 5 + 7)
    })

    it("should reduce a single value with an index of 0", () => {
      const result = lib.reduceSome(-1, (_state, _value, index) => index, 101)
      expect(result).toBe(0)
    })
  })

  describe("wrap", () => {
    describe("when the input is an array", () => {
      it("returns the input array as is", () => {
        const array = [1, 2, 3]
        const result = lib.wrap(array)
        expect(result).toBe(array)
      })
    })

    describe("when the input is a single value", () => {
      it("wrap the value in an array", () => {
        const value = 42
        const result = lib.wrap(value)
        expect(result).toEqual([value])
      })
    })
  })
})
