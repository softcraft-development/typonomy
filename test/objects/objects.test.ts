import { describe, expect, it } from "vitest"
import { Break } from "../../src/break"
import { JsonParseError } from "../../src/json"
import * as lib from "../../src/objects"

describe(lib.keysForValue, () => {
  describe("for a string enum", () => {
    enum TestEnum {
      A = "a",
      B = "b",
      C = "c",
      BB = "b",
    }

    it("returns the key for a unique value", () => {
      expect(lib.keysForValue(TestEnum, "a")).toBe("A")
    })

    it("returns an array of keys for a non-unique value", () => {
      expect(lib.keysForValue(TestEnum, "b")).toEqual(["B", "BB"])
    })

    it("returns undefined if an unmapped value", () => {
      expect(lib.keysForValue(TestEnum, "x")).toBeUndefined()
    })
  })

  describe("for a numeric enum", () => {
    enum TestEnum {
      A = 1,
      B = 2,
      C = 5,
      BB = 2,
    }

    it("returns the key for a unique value", () => {
      expect(lib.keysForValue(TestEnum, 1)).toBe("A")
    })

    it("returns an array of keys for a non-unique value", () => {
      expect(lib.keysForValue(TestEnum, 2)).toEqual(["B", "BB"])
    })

    it("returns undefined if an unmapped value", () => {
      expect(lib.keysForValue(TestEnum, 4)).toBeUndefined()
    })
  })

  describe("for a record", () => {
    const record = lib.recordOf<string, number>({ a: 1, b: 2, bb: 2, c: 3 })

    it("returns the key for a unique value", () => {
      expect(lib.keysForValue(record, 3)).toBe("c")
    })

    it("returns an array of keys for a non-unique value", () => {
      expect(lib.keysForValue(record, 2)).toEqual(["b", "bb"])
    })

    it("returns undefined if an unmapped value", () => {
      expect(lib.keysForValue(record, -1)).toBeUndefined()
    })
  })

  describe("for an object", () => {
    const obj = { a: 1, b: "B", bb: "B", c: "1" }

    it("returns the key for a unique value", () => {
      expect(lib.keysForValue(obj, 1)).toBe("a")
    })

    it("returns an array of keys for a non-unique value", () => {
      expect(lib.keysForValue(obj, "B")).toEqual(["b", "bb"])
    })

    it("returns undefined if an unmapped value", () => {
      expect(lib.keysForValue(obj, false)).toBeUndefined()
    })

    describe("with a custom equality check", () => {
      it("returns keys for values that match the check", () => {
        const check = (a: unknown, b: unknown) => String(a) === String(b)
        expect(lib.keysForValue(obj, 1, check)).toEqual(["a", "c"])
      })
    })
  })
})

describe(lib.plucker, () => {
  interface TestType {
    a: number
    b: string
  }
  it("returns a pluck function", () => {
    const pluckA = lib.plucker<TestType, "a">("a")
    const obj = { a: 19, b: "Test string" }
    expect(pluckA(obj)).toEqual(19)
  })
})

describe(lib.reduceObject, () => {
  it("should reduce the keys and values of an object", () => {
    const obj = { a: 3, b: undefined, c: 7, d: null }
    const result = lib.reduceObject(obj, (state, value, key) => `${state} ${key}:${value}`, "Initial")
    expect(result).toBe("Initial a:3 b:undefined c:7 d:null")
  })

  it("should reduce the keys and values of a record", () => {
    const record: Record<string, number> = { a: 1, b: 3, c: 5 }
    const result = lib.reduceObject(record, (state, value, key) => `${state} ${key}:${value}`, "Initial")
    expect(result).toBe("Initial a:1 b:3 c:5")
  })

  describe("when the reducer breaks execution", () => {
    it("should only reduce prior to the break", () => {
      const obj = { a: 3, b: undefined, c: 7, d: null }
      const result = lib.reduceObject(obj, (state, value, key) => {
        if (value === undefined) throw Break
        return `${state} ${key}:${value}`
      }, "Initial")
      expect(result).toBe("Initial a:3")
    })
  })
})

describe(lib.errorToObject, () => {
  it.only("sets the name", () => {
    expect(lib.errorToObject(new JsonParseError("Test Error", "Invalid"))).toMatchObject({ name: "JsonParseError" })
  })

  it("sets the message", () => {
    expect(lib.errorToObject(new Error("Test Error"))).toMatchObject({ message: "Test Error" })
  })

  it("converts the Error cause to an object", () => {
    expect(lib.errorToObject(new Error("Test Error", {
      cause: new Error("Cause Error"),
    }))).toMatchObject({ cause: { message: "Cause Error" } })
  })
})
