import { beforeEach, describe, expect, it, vi } from "vitest"
import * as lib from "../src/arrays"
import { Break } from "../src/break"
import { isNumber, isString, isUndefined } from "../src/typeGuards"
import type { Action, Bag, Optional, Reducer, Some, TypeGuard } from "../src/types"

describe("arrays", () => {
  describe("addMore", () => {
    it("creates an array for two single values", () => {
      const result = lib.addMore(1, 2)
      expect(result).toEqual([1, 2])
    })

    it("appends a value to an array", () => {
      const result = lib.addMore([1, 2], 3)
      expect(result).toEqual([1, 2, 3])
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

  describe("bag", () => {
    interface TestType { key: string }
    let bag: Bag<TestType>
    let element: Optional<TestType>
    let result = () => lib.bag(bag, element)

    describe("when the bag is undefined", () => {
      beforeEach(() => {
        bag = undefined
      })

      describe("and the element is undefined", () => {
        beforeEach(() => {
          element = undefined
        })
        it("returns undefined", () => {
          expect(result()).toBeUndefined()
        })
      })

      describe("and the element is defined", () => {
        beforeEach(() => {
          element = { key: "Element" }
        })
        it("returns the element", () => {
          expect(result()).toBe(element)
        })
      })
    })

    describe("when the bag is singular", () => {
      beforeEach(() => {
        bag = { key: "Bag" }
      })

      describe("and the element is undefined", () => {
        beforeEach(() => {
          element = undefined
        })
        it("returns the bag", () => {
          expect(result()).toBe(bag)
        })
      })

      describe("and the element is defined", () => {
        beforeEach(() => {
          element = { key: "Element" }
        })
        it("returns the a new array with both elements", () => {
          expect(result()).toEqual([bag, element])
        })
      })
    })

    describe("when the bag is plural", () => {
      beforeEach(() => {
        bag = [{ key: "First" }, { key: "Second" }]
      })

      describe("and the element is undefined", () => {
        beforeEach(() => {
          element = undefined
        })
        it("returns the bag", () => {
          expect(result()).toBe(bag)
        })
      })

      describe("and the element is defined", () => {
        beforeEach(() => {
          element = { key: "Element" }
        })
        it("appends the new elements", () => {
          expect(result()).toBe(bag)
          expect(bag).toContain(element)
        })
      })
    })
  })

  describe("forArray", () => {
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

    it("can call back an empty bag with the right mapper", () => {
      const emptyBag: Bag<number> = undefined
      const callback: Action<Optional<number>> = vi.fn()
      lib.forSome(emptyBag, callback)
      expect(callback).toBeCalledWith(undefined, 0)
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
    it("returns true for an array with elements", () => {
      expect(lib.isPlural([1, 2, 3])).toBe(true)
    })

    it("returns true for an empty array", () => {
      expect(lib.isPlural([])).toBe(true)
    })

    it("returns true for a single element array", () => {
      expect(lib.isPlural([42])).toBe(true)
    })

    it("returns false if the value is a single element", () => {
      expect(lib.isPlural(42)).toBe(false)
    })

    it("returns false for undefined", () => {
      expect(lib.isPlural(undefined)).toBe(false)
    })
  })

  describe("isSingular", () => {
    it("returns false for an array with elements", () => {
      expect(lib.isSingular([1, 2, 3])).toBe(false)
    })

    it("returns false for an empty array", () => {
      expect(lib.isSingular([])).toBe(false)
    })

    it("returns false for a single element array", () => {
      expect(lib.isSingular([42])).toBe(false)
    })

    it("returns true if the value is a single element", () => {
      expect(lib.isSingular(42)).toBe(true)
    })

    it("returns false for undefined", () => {
      expect(lib.isSingular(undefined)).toBe(false)
    })
  })

  describe("fill", () => {
    it("should fill the array with values generated by the filler function", () => {
      const filler = (value: number) => value * 2
      const result = lib.fill(4, filler)
      expect(result).toEqual([2, 4, 6, 8])
    })
  })

  describe("mapArray", () => {
    it("maps an array of values", () => {
      expect(lib.mapArray([3, 5, 7], (value, index) => `${index}:${value}`)).toEqual(["0:3", "1:5", "2:7"])
    })

    describe("when the mapper breaks execution", () => {
      it("maps only the prior elements", () => {
        expect(lib.mapArray([3, 5, 7], (value, index) => {
          if (index === 2) throw Break
          return `${index}:${value}`
        })).toEqual(["0:3", "1:5"])
      })
    })
  })

  describe("mapOptional", () => {
    const mapper = lib.mapOptional((value: string, index: number) => Number.parseInt(value) + index)

    it("maps a value", () => {
      expect(mapper("13", 5)).toEqual(18)
    })

    it("maps undefined", () => {
      expect(mapper(undefined, 5)).toBeUndefined()
    })
  })

  describe("mapReducer", () => {
    it("creates an array Reducer for a mapper", () => {
      const mapper = (value: Optional<number>, index: number) => ((value || 0) + index).toString()
      const reducer = lib.mapReducer(mapper)
      expect(reducer(["initial"], 42, -1)).toEqual(["initial", "41"])
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
        const mapper = (value: Optional<string>, index: number) => `${index}:${value}`
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

    it("can map an empty bag with the right mapper", () => {
      const emptyBag: Bag<number> = undefined
      const mapper = (value: Optional<number>) => {
        if (isUndefined(value)) {
          return "Empty Bag"
        }
        return value.toString()
      }
      const result = lib.mapSome(emptyBag, mapper)
      expect(result).toEqual(["Empty Bag"])
    })
  })

  describe("reduceArray", () => {
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

    it("can reduce an empty bag with the right reducer", () => {
      const emptyBag: Bag<string> = undefined
      const reducer: Reducer<string, Optional<string>, number> = (_, value) => {
        if (isUndefined(value)) {
          return "Empty Bag"
        }
        return value
      }
      const result = lib.reduceSome(emptyBag, reducer, "Initial")
      expect(result).toBe("Empty Bag")
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
          if (state >= 102) throw Break
          return state + value
        }
        const result = lib.reiterate(97, reducer, 101)
        expect(result).toEqual(101 + 1)
      })
    })
  })

  describe("typeGuardSome", () => {
    describe("returns a TypeGuard", () => {
      let guard: TypeGuard<Some<string>>

      beforeEach(() => {
        guard = lib.typeGuardSome(isString)
      })

      it("that can guard a single value", () => {
        expect(guard("test")).toBe(true)
      })

      it("that can guard an array of values", () => {
        expect(guard(["foo", "bar"])).toBe(true)
      })

      it("that is true for an empty array", () => {
        expect(guard([])).toBe(true)
      })

      it("that returns false for undefined", () => {
        expect(guard(undefined)).toBe(false)
      })

      it("that returns false for null", () => {
        expect(guard(null)).toBe(false)
      })

      it("that returns false for an array that does not match all types", () => {
        expect(guard(["a", "b", 3])).toBe(false)
      })
    })
  })

  describe("unwrap", () => {
    describe("when the input is an array of multiple elements", () => {
      it("returns the same array", () => {
        const array = [1, 2, 3]
        expect(lib.unwrap(array)).toBe(array)
      })
    })

    describe("when the input is an array of a single element", () => {
      it("returns the element", () => {
        const element = { foo: "bar" }
        expect(lib.unwrap([element])).toBe(element)
      })
    })

    describe("when the input is an empty array", () => {
      it("returns undefined", () => {
        expect(lib.unwrap([])).toBeUndefined()
      })
    })
  })

  describe("wrap", () => {
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
})
