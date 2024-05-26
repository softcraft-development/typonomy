import { reiterate } from "./func"
describe("func", () => {
  describe("reiterate", () => {
    it("should return the initial state when count is 0", () => {
      const initialState = { key: "Initial state" }
      const result = reiterate(0, () => { return { key: "Not the initial state" } }, initialState)
      expect(result).toBe(initialState)
    })

    it("should apply the reducer function the specified number of times", () => {
      const result = reiterate(3, (state, value) => {
        state.calls.push(value)
        return state
      }, { calls: new Array<number>() })
      expect(result.calls).toEqual([1, 2, 3])
    })
  })
})