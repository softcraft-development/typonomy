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
})