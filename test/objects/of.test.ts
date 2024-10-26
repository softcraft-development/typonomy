import { describe, expect, it } from "vitest"
import * as lib from "../../src/objects"

describe("objectOf", () => {
  it("returns the object", () => {
    interface Test {
      a: string
      b?: number
    }
    // input obeys Test but is not inferred to be Test.
    const input = { a: "Hello", b: 42 }
    // Output is inferred to be Test.
    const output = lib.objectOf<Test>(input)
    expect(output).toBe(input)
  })
})

describe("recordOf", () => {
  describe("by default", () => {
    it("returns an empty object", () => {
      expect(lib.recordOf()).toEqual({})
    })
  })

  describe("when passed an object", () => {
    it("returns that object", () => {
      const object = { a: 1, b: 2 }
      expect(lib.recordOf(object)).toBe(object)
    })
  })

  it("is explicitly typed", () => {
    const record = lib.recordOf<string, number>()
    record["test"] = 17
    expect(record).toEqual({ test: 17 })
  })
})
