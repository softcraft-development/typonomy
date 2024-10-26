import { beforeEach, describe, expect, it, vi } from "vitest"
import { Break } from "../src/break"
import { isNumber } from "../src/numbers"
import * as lib from "../src/some"
import type { Some } from "../src/types"

describe("addMore", () => {
  it("creates an array for two single values", () => {
    const result = lib.addMore(1, 2)
    expect(result).toEqual([1, 2])
  })

  it("pushes a value to an array", () => {
    const result = lib.addMore([1, 2], 3)
    expect(result).toEqual([1, 2, 3])
  })
})

describe("forSome", () => {
  describe("with a single value", () => {
    it("should apply the callback with index 0", () => {
      const callback = vi.fn()
      lib.forSome(19, callback)
      expect(callback).toHaveBeenCalledOnce()
      expect(callback).toHaveBeenCalledWith(19, 0)
    })

    describe("when the callback breaks execution", () => {
      it("call the callback without exceptions", () => {
        const callback = vi.fn(() => {
          throw Break
        })
        lib.forSome(23, callback)
        expect(callback).toHaveBeenCalledOnce()
      })
    })
  })

  describe("with an array of values", () => {
    it("should apply the callback for each element with its index", () => {
      const callback = vi.fn()
      lib.forSome([5, 7, 11], callback)
      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenNthCalledWith(1, 5, 0)
      expect(callback).toHaveBeenNthCalledWith(2, 7, 1)
      expect(callback).toHaveBeenNthCalledWith(3, 11, 2)
    })

    describe("when the callback breaks execution", () => {
      it("calls the callback for only the prior elements", () => {
        const callback = vi.fn((_value, index) => {
          if (index === 1) throw Break
        })
        lib.forSome([5, 7, 11], callback)
        expect(callback).toHaveBeenCalledTimes(2)
        expect(callback).toHaveBeenNthCalledWith(1, 5, 0)
        expect(callback).toHaveBeenNthCalledWith(2, 7, 1)
      })
    })
  })
})

describe("isSome", () => {
  describe("isSome", () => {
    it("returns true for an array of the specified type", () => {
      expect(lib.isSome([1, 2, 3], isNumber)).toBe(true)
    })
    it("returns false for an empty array", () => {
      expect(lib.isSome([], isNumber)).toBe(false)
    })
    it("returns true for a single element array of the specified type", () => {
      expect(lib.isSome([42], isNumber)).toBe(true)
    })
    it("returns false if the value is undefined", () => {
      expect(lib.isSome(undefined, isNumber)).toBe(false)
    })
    it("returns true for a single value of the specified type", () => {
      expect(lib.isSome(42, isNumber)).toBe(true)
    })

    it("returns false for an array that contains other types", () => {
      expect(lib.isSome([1, "2", 3], isNumber)).toBe(false)
    })

    it("returns false if the value is null", () => {
      expect(lib.isSome(null, isNumber)).toBe(false)
    })
    it("returns false for a single value of another type", () => {
      expect(lib.isSome("42", isNumber)).toBe(false)
    })
  })
})

describe("mapSome", () => {
  describe("with a single value", () => {
    it("should return the mapped value", () => {
      const value = 42
      const transform = (value?: number) => String(value)
      const result = lib.mapSome(value, transform)
      expect(result).toBe("42")
    })

    it("should set the index to 0", () => {
      const result = lib.mapSome(-1, (value, index) => `${value}:${index}`)
      expect(result).toBe("-1:0")
    })

    describe("when the mapper breaks execution", () => {
      it("should return an empty array", () => {
        expect(lib.mapSome(42, () => {
          throw Break
        })).toEqual([])
      })
    })
  })

  describe("with an array of values", () => {
    it("return an array of mapped values", () => {
      const value = ["a", "b", "c"]
      const mapper = (value: string, index: number) => `${index}:${value}`
      const result = lib.mapSome(value, mapper)
      expect(result).toEqual(["0:a", "1:b", "2:c"])
    })

    describe("when the mapper breaks execution", () => {
      it("maps only the prior elements", () => {
        expect(lib.mapSome([3, 5, 7], (value, index) => {
          if (index === 2) throw Break
          return `${index}:${value}`
        })).toEqual(["0:3", "1:5"])
      })
    })
  })
})

describe("reduceSome", () => {
  describe("with a single value", () => {
    it("reduce the value with an index of 0", () => {
      const result = lib.reduceSome(42, (state, value, index) => `${state}->${index}:${value}`, "initial")
      expect(result).toBe("initial->0:42")
    })

    describe("when the reducer breaks execution", () => {
      it("returns the initial state", () => {
        const initial = { value: "Initial" }
        const result = lib.reduceSome(42, () => {
          throw Break
        }, initial)
        expect(result).toBe(initial)
      })
    })
  })

  describe("with an array of values", () => {
    it("reduces each elem ent", () => {
      expect(lib.reduceSome([3, 5, 7], (state, value) => state + (value || 0), 11)).toBe(3 + 5 + 7 + 11)
    })

    describe("when the reducer breaks on the first element", () => {
      it("returns the initial state", () => {
        const initial = { last: -1 }
        type State = typeof initial
        const reducer = (_state: State, _value: number, index: number) => {
          if (index === 0) throw Break
          throw new Error("Should never get past the first index")
        }
        const result = lib.reduceSome([1, 2, 3], reducer, initial)
        expect(result).toBe(initial)
      })
    })

    describe("when the reducer breaks on a subsequent element", () => {
      it("does not continue to reduce", () => {
        const reducer = vi.fn((state, value, index) => {
          if (index === 2) throw Break
          return state + value
        })
        const result = lib.reduceSome([5, 7, 11, 13], reducer, 17)
        expect(result).toBe(5 + 7 + 17)
      })
    })
  })
})

describe("someSize", () => {
  let some: Some<string>

  describe("for a single item", () => {
    beforeEach(() => {
      some = "A single item"
    })

    it("is one", () => {
      expect(lib.someSize(some)).toEqual(1)
    })
  })

  describe("for multiple items", () => {
    beforeEach(() => {
      some = lib.addMore("First", "Second")
    })

    it("is the number of items", () => {
      expect(lib.someSize(some)).toEqual(2)
    })
  })
})
