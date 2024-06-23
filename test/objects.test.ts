import { describe, expect, it } from "vitest"
import { Break, or } from "../src/func"
import { isUndefined } from "../src/nullish"
import * as lib from "../src/objects"
import { isString } from "../src/strings"
import { isBoolean, isNumber } from "../src/types"

describe("object", () => {
  describe("isEmptyObject", () => {
    it("returns true for an empty object", () => {
      expect(lib.isEmptyObject({})).toBe(true)
    })

    it("returns false for an object with keys", () => {
      expect(lib.isEmptyObject({ a: 1, b: 2 })).toBe(false)
    })

    it("returns false for null", () => {
      expect(lib.isEmptyObject(null)).toBe(false)
    })

    it("returns false for undefined", () => {
      expect(lib.isEmptyObject(undefined)).toBe(false)
    })
  })

  describe("isObject", () => {
    it("returns true if the value is an object", () => {
      expect(lib.isObject({})).toBe(true)
    })

    it("returns false if the value is an array", () => {
      expect(lib.isObject([])).toBe(false)
    })

    it("returns false if the value is a number", () => {
      expect(lib.isObject(17)).toBe(false)
    })

    it("returns false if the value is a string", () => {
      expect(lib.isObject("test")).toBe(false)
    })

    it("returns false if the value is null", () => {
      expect(lib.isObject(null)).toBe(false)
    })

    it("returns false if the value is undefined", () => {
      expect(lib.isObject(undefined)).toBe(false)
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

  describe("typeGuardFor", () => {
    interface TestType {
      a: number
      b?: string
      c: boolean
    }

    const validation = lib.typeGuardFor<TestType>({
      a: isNumber,
      b: or(isString, isUndefined),
      c: isBoolean,
    })

    it("returns true when the object's properties pass the predicates", () => {
      expect(validation({ a: 1, c: true })).toBe(true)
    })

    it("returns false when the object's properties do not pass the predicates", () => {
      expect(validation({ a: 1, b: "hello" })).toBe(false)
    })

    it("returns false when the object is empty", () => {
      expect(validation({})).toBe(false)
    })

    it("returns false for undefined", () => {
      expect(validation(undefined)).toBe(false)
    })

    it("returns false for null", () => {
      expect(validation(null)).toBe(false)
    })
  })

  describe("isRecordOf", () => {
    it("returns true if the value is a record of specific types", () => {
      expect(lib.isRecordOf<number>({ a: 1, b: 2, c: 3 }, isNumber)).toBe(true)
    })

    it("returns false for arrays of the given type", () => {
      expect(lib.isRecordOf<number>([3, 7, 11], isNumber)).toBe(false)
    })

    it("returns false for undefined", () => {
      expect(lib.isRecordOf<number>(undefined, isNumber)).toBe(false)
    })

    it("returns false for null", () => {
      expect(lib.isRecordOf<number>(undefined, isNumber)).toBe(false)
    })

    it("returns false for a value of the type", () => {
      expect(lib.isRecordOf<number>(1, isNumber)).toBe(false)
    })

    it("returns false if the value is a record of any other type", () => {
      expect(lib.isRecordOf<number>({ a: 1, b: 2, c: "3" }, isNumber)).toBe(false)
    })

    describe("when emptyMatches is false", () => {
      it("returns false for an empty record", () => {
        expect(lib.isRecordOf<number>({}, isNumber, false)).toBe(false)
      })
    })

    describe("when emptyMatches is true", () => {
      it("returns true for an empty record", () => {
        expect(lib.isRecordOf<number>({}, isNumber, true)).toBe(true)
      })
    })
  })

  describe("keysForValue", () => {
    describe("for an enum", () => {
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

  describe("reduceRecord", () => {
    it("should reduce the keys and values of a record object", () => {
      const obj = { a: 3, b: undefined, c: 7, d: null }
      const result = lib.reduceRecord(obj, (state, value, key) => `${state} ${key}:${value}`, "Initial")
      expect(result).toBe("Initial a:3 b:undefined c:7 d:null")
    })

    describe("when the reducer breaks execution", () => {
      it("should reduce the keys and values of a record object", () => {
        const obj = { a: 3, b: undefined, c: 7, d: null }
        const result = lib.reduceRecord(obj, (state, value, key) => {
          if (value === undefined) throw Break
          return `${state} ${key}:${value}`
        }, "Initial")
        expect(result).toBe("Initial a:3")
      })
    })
  })
})
