import * as nullish from "nullish"

describe("nullish", () => {
  describe("insist", () => {
    let value: object | null | undefined

    describe("when the value is not null or undefined", () => {
      beforeEach(() => {
        value = { key: "A specific object" }
      })

      it("is the same object", () => {
        expect(nullish.insist(value)).toBe(value)
      })
    })

    describe("when the value is null", () => {
      beforeEach(() => {
        value = null
      })

      it("throws an error", () => {
        expect(() => { nullish.insist(value) }).toThrow()
      })
    })

    describe("when the value is undefined", () => {
      beforeEach(() => {
        value = undefined
      })

      it("throws an error", () => {
        expect(() => { nullish.insist(value) }).toThrow()
      })
    })
  })
})