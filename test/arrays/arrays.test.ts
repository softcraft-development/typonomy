import { describe, expect, it, vi } from "vitest"
import * as lib from "../../src/arrays"
import { Break } from "../../src/break"
import type { Optional } from "../../src/types"

describe(lib.arrayOf, () => {
  it("returns an array of the specified size", () => {
    const result = lib.arrayOf(5)
    expect(result.length).toBe(5)
  })

  it("returns an empty array if no size is specified", () => {
    const result = lib.arrayOf()
    expect(result.length).toBe(0)
  })
})

describe(lib.forArray, () => {
  it("applies the callback to each element", () => {
    const callback = vi.fn()
    lib.forArray([3, 5, 7], callback)
    expect(callback).toHaveBeenNthCalledWith(1, 3, 0)
    expect(callback).toHaveBeenNthCalledWith(2, 5, 1)
    expect(callback).toHaveBeenNthCalledWith(3, 7, 2)
  })

  describe("when the callback breaks on the first element", () => {
    it("applies the callback to every element on or before the break", () => {
      const callback = vi.fn((_, index) => {
        if (index === 1) throw Break
      })
      lib.forArray([3, 5, 7], callback)
      expect(callback).toHaveBeenCalledTimes(2)
      expect(callback).toHaveBeenNthCalledWith(1, 3, 0)
      expect(callback).toHaveBeenNthCalledWith(2, 5, 1)
    })
  })
})

describe(lib.fill, () => {
  it("should fill the array with values generated by the filler function", () => {
    const filler = (value: number) => value * 2
    const result = lib.fill(4, filler)
    expect(result).toEqual([2, 4, 6, 8])
  })
})

describe(lib.isEmptyArray, () => {
  it("returns true for an empty array", () => {
    expect(lib.isEmptyArray([])).toBe(true)
  })

  it("returns false for an array with elements", () => {
    expect(lib.isEmptyArray([19])).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(lib.isEmptyArray(undefined)).toBe(false)
  })
})

describe(lib.reduceArray, () => {
  it("reduces an array of values", () => {
    expect(lib.reduceArray([3, 5, 7], (state, value) => state + (value || 0), 11)).toBe(3 + 5 + 7 + 11)
  })

  describe("when the reducer breaks on the first element", () => {
    it("returns the initial state", () => {
      const initial = { last: -1 }
      type State = typeof initial
      const reducer = (_state: State, _value: Optional<number>, index: number) => {
        if (index === 0) throw Break
        throw new Error("Should never get past the first index")
      }
      const result = lib.reduceArray([1, 2, 3], reducer, initial)
      expect(result).toBe(initial)
    })
  })

  describe("when the reducer breaks on a subsequent element", () => {
    it("does not continue to reduce", () => {
      const reducer = vi.fn((state, value, index) => {
        if (index === 2) throw Break
        return state + value
      })
      const result = lib.reduceArray([5, 7, 11, 13], reducer, 17)
      expect(result).toBe(5 + 7 + 17)
    })
  })
})

describe(lib.reiterate, () => {
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
        if (state >= 102) throw Break
        return state + value
      }
      const result = lib.reiterate(97, reducer, 101)
      expect(result).toEqual(101 + 1)
    })
  })
})

describe(lib.wrap, () => {
  describe("when the input is an array", () => {
    it("returns the same array", () => {
      const array = [1, 2, 3]
      expect(lib.wrap(array)).toBe(array)
    })
  })

  describe("when the input is a single value", () => {
    it("wrap the value in an array", () => {
      expect(lib.wrap(42)).toEqual([42])
    })
  })

  describe("when the input is undefined", () => {
    it("returns an empty array", () => {
      expect(lib.wrap(undefined)).toEqual([])
    })
  })
})
