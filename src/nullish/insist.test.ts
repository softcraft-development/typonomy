import { insist } from "./insist"

describe("insist", () => {
  let value: object | null | undefined

  describe("when the value is not null or undefined", () => {
    beforeEach(() => {
      value = { key: "A specific object" }
    })

    it("is the same object", () => {
      expect(insist(value)).toBe(value)
    })
  })

  describe("when the value is null", () => {
    beforeEach(() => {
      value = null
    })

    it("throws an error", () => {
      expect(() => { insist(value) }).toThrow()
    })
  })

  describe("when the value is undefined", () => {
    beforeEach(() => {
      value = undefined
    })

    it("throws an error", () => {
      expect(() => { insist(value) }).toThrow()
    })
  })
})
