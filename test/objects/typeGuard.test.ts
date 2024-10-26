import { describe, expect, it } from "vitest"
import { or } from "../../src/logic"
import { isUndefined } from "../../src/nullish"
import { isNumber } from "../../src/numbers"
import * as lib from "../../src/objects"
import { isString } from "../../src/strings"
import { isBoolean } from "../../src/typeGuards"

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

describe("typeGuardRecord", () => {
  const record = { a: 1, b: 2, c: 3 }
  const guard = lib.typeGuardRecord(lib.typeGuardKeys(record), isNumber)

  it("returns true for a matching record", () => {
    expect(guard(record)).toBe(true)
  })

  it("returns false for a object that does not match keys", () => {
    expect(guard({ a: 1, d: 4, e: 5 })).toBe(false)
  })

  it("returns false for an object that does not match values", () => {
    expect(guard({ a: 1, b: "B", c: 3 })).toBe(false)
  })
})

describe("typeGuardValues", () => {
  describe("for a string enum", () => {
    enum TestEnum {
      A = "a",
      B = "b",
      C = "c",
      BB = "b",
    }
    const guard = lib.typeGuardValues(TestEnum)

    it("returns true for a unique value", () => {
      expect(guard("a")).toBe(true)
    })

    it("returns true for a non-unique value", () => {
      expect(guard("b")).toBe(true)
    })

    it("returns false for a non value", () => {
      expect(guard("x")).toBe(false)
    })
  })

  describe("for a numeric enum", () => {
    enum TestEnum {
      A = 1,
      B = 2,
      C = 5,
      BB = 2,
    }
    const guard = lib.typeGuardValues(TestEnum)

    it("returns true for a unique value", () => {
      expect(guard(1)).toBe(true)
    })

    it("returns true for a non-unique value", () => {
      expect(guard(2)).toBe(true)
    })

    it("returns false for a non value", () => {
      expect(guard(4)).toBe(false)
    })
  })

  describe("for an record", () => {
    const record = lib.recordOf<string, number>({ a: 1, b: 2, bb: 2, c: 3 })
    const guard = lib.typeGuardValues<Record<string, number>>(record)

    it("returns true for a unique value", () => {
      expect(guard(3)).toBe(true)
    })

    it("returns true for a non-unique value", () => {
      expect(guard(2)).toBe(true)
    })

    it("returns false for a non value", () => {
      expect(guard(-1)).toBe(false)
    })
  })

  describe("for an object", () => {
    const obj = { a: 1, b: "B", bb: "B", c: "3" }
    type TestType = typeof obj
    const guard = lib.typeGuardValues<TestType>(obj)

    it("returns true for a unique value", () => {
      expect(guard(1)).toBe(true)
    })

    it("returns true for a non-unique value", () => {
      expect(guard("B")).toBe(true)
    })

    it("returns false if an unmapped value", () => {
      expect(guard(3)).toBe(false)
    })

    describe("with a custom equality check", () => {
      const check = (a: unknown, b: unknown) => String(a) === String(b)
      const guard = lib.typeGuardValues(obj, check)
      it("returns true for values that match the check", () => {
        expect(guard(3)).toBe(true)
      })
    })
  })
})
