import * as lib from "./array"

describe("array", () => {
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

  describe("arr", () => {
    it("should return an array of the specified size", () => {
      const result = lib.arr(5)
      expect(result.length).toBe(5)
    })

    it("should return an empty array if no size is specified", () => {
      const result = lib.arr()
      expect(result.length).toBe(0)
    })
  })

  describe("fill", () => {
    it("should fill the array with values generated by the filler function", () => {
      const filler = (value: number) => value * 2
      const result = lib.fill(4, filler)
      expect(result).toEqual([2, 4, 6, 8])
    })
  })
})
