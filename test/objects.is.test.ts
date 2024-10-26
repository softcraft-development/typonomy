import { describe, expect, it } from "vitest"
import { isNumber } from "../src/numbers"
import * as lib from "../src/objects"
import { isString } from "../src/strings"
import { isUnknown } from "../src/typeGuards"

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

describe("isKeyOf", () => {
  it("returns true if the value is a key of the example", () => {
    expect(lib.isKeyOf("a", { a: 1, b: 2 })).toBe(true)
  })

  it("returns false if the value is not key of the example", () => {
    expect(lib.isKeyOf("d", { a: 1, b: 2 })).toBe(false)
  })

  it("returns false for null", () => {
    expect(lib.isKeyOf(null, { a: 1, b: 2 })).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(lib.isKeyOf(undefined, { a: 1, b: 2 })).toBe(false)
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

describe("isPropertyKey", () => {
  it("returns true if the value is a string", () => {
    expect(lib.isPropertyKey("hello")).toBe(true)
  })

  it("returns true if the value is a number", () => {
    expect(lib.isPropertyKey(13)).toBe(true)
  })

  it("returns true if the value is a Symbol", () => {
    expect(lib.isPropertyKey(Symbol("test"))).toBe(true)
  })

  it("returns false if the value is an object", () => {
    expect(lib.isPropertyKey({})).toBe(false)
  })

  it("returns false if the value is a boolean", () => {
    expect(lib.isPropertyKey(true)).toBe(false)
  })

  it("returns false if the value is null", () => {
    expect(lib.isPropertyKey(null)).toBe(false)
  })

  it("returns false if the value is undefined", () => {
    expect(lib.isPropertyKey(false)).toBe(false)
  })
})

describe("isRecordOf", () => {
  it("returns true if the value is a record of specific types", () => {
    expect(lib.isRecordOf({ a: 1, b: 2, c: 3 }, isString, isNumber)).toBe(true)
  })

  it("returns false for arrays when assigned string keys", () => {
    expect(lib.isRecordOf([3, 7, 11], isString, isNumber)).toBe(false)
  })

  it("returns true for arrays when assigned string keys", () => {
    expect(lib.isRecordOf([3, 7, 11], isNumber, isNumber)).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(lib.isRecordOf(undefined, lib.isPropertyKey, isUnknown)).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(lib.isRecordOf(null, lib.isPropertyKey, isUnknown)).toBe(false)
  })

  it("returns false for a value of the value type", () => {
    expect(lib.isRecordOf(1, lib.isPropertyKey, isNumber)).toBe(false)
  })

  it("returns false if the value is a record of any other type", () => {
    expect(lib.isRecordOf({ a: 1, b: 2, c: "3", d: 4 }, isString, isNumber)).toBe(false)
  })

  describe("when emptyMatches is false", () => {
    it("returns false for an empty record", () => {
      expect(lib.isRecordOf({}, lib.isPropertyKey, isUnknown, false)).toBe(false)
    })
  })

  describe("when emptyMatches is true", () => {
    it("returns false for an empty record", () => {
      expect(lib.isRecordOf({}, lib.isPropertyKey, isUnknown, true)).toBe(true)
    })
  })
})
