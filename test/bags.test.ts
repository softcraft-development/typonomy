import { beforeEach, describe, expect, it, vi } from "vitest"
import * as lib from "../src/bags"
import { Break } from "../src/break"
import { isUndefined } from "../src/typeGuards"
import type { Bag, Optional } from "../src/types"

describe("bags", () => {
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
        it("pushes the new elements", () => {
          expect(result()).toBe(bag)
          expect(bag).toContain(element)
        })
      })
    })
  })

  describe("forBag", () => {
    describe("with a single value", () => {
      it("should apply the callback with index 0", () => {
        const callback = vi.fn()
        lib.forBag(19, callback)
        expect(callback).toHaveBeenCalledOnce()
        expect(callback).toHaveBeenCalledWith(19, 0)
      })

      describe("when the callback breaks execution", () => {
        it("call the callback without exceptions", () => {
          const callback = vi.fn(() => {
            throw Break
          })
          lib.forBag(23, callback)
          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })

    describe("with undefined value", () => {
      it("should apply the callback with index 0", () => {
        const callback = vi.fn()
        lib.forBag(undefined, callback)
        expect(callback).toHaveBeenCalledOnce()
        expect(callback).toHaveBeenCalledWith(undefined, 0)
      })

      describe("when the callback breaks execution", () => {
        it("call the callback without exceptions", () => {
          const callback = vi.fn(() => {
            throw Break
          })
          lib.forBag(undefined, callback)
          expect(callback).toHaveBeenCalledOnce()
        })
      })
    })

    describe("with an array of values", () => {
      it("should apply the callback for each element with its index", () => {
        const callback = vi.fn()
        lib.forBag([5, 7, 11], callback)
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
          lib.forBag([5, 7, 11], callback)
          expect(callback).toHaveBeenCalledTimes(2)
          expect(callback).toHaveBeenNthCalledWith(1, 5, 0)
          expect(callback).toHaveBeenNthCalledWith(2, 7, 1)
        })
      })
    })
  })

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
})
