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
})