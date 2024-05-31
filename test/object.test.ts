import * as lib from "src/object"

describe("object", () => {
  describe("isEmpty", () => {
    it("should return true for an empty object", () => {
      const obj = {}
      const result = lib.isEmpty(obj)
      expect(result).toBe(true)
    })

    it("should return false for an object with keys", () => {
      const obj = { a: 1, b: 2 }
      const result = lib.isEmpty(obj)
      expect(result).toBe(false)
    })
  })

  describe("reduce", () => {
    it("should reduce the keys and values of a record object", () => {
      const obj = { a: 3, b: undefined, c: 7, d: null }
      const result = lib.reduce(obj, (state, value, key) => `${key}:${value},${state}`, "")
      expect(result).toBe("d:null,c:7,b:undefined,a:3,")
    })
  })
})
