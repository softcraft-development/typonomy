import { reduce } from "@/object"

describe("object", () => {
  describe("reduce", () => {
    it("should reduce the keys and values of a record object", () => {
      const obj = { a: 3, b: undefined, c: 7, d: null }
      const result = reduce(obj, (state, value, key) => `${key}:${value},${state}`, "")
      expect(result).toBe("d:null,c:7,b:undefined,a:3,")
    })
  })
})
