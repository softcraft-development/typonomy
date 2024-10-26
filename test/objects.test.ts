import { describe, expect, it } from "vitest"
import { Break } from "../src/break"
import { or } from "../src/logic"
import { isNumber } from "../src/number"
import * as lib from "../src/objects"
import { isBoolean, isString, isUndefined, isUnknown } from "../src/typeGuards"

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

describe("keysForValue", () => {
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

describe("plucker", () => {
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

describe("reduceObject", () => {
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
