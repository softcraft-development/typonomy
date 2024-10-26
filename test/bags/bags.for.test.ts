import { describe, expect, it, vi } from "vitest"
import * as lib from "../../src/bags"
import { Break } from "../../src/break"

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
