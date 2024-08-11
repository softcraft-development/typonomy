import { beforeEach, describe, expect, it } from "vitest"
import { reduceBag } from "../src/bags"
import { reduceSome } from "../src/some"
import * as lib from "../src/strings"
import type { Optional, Possible, Thunk } from "../src/types"

describe("strings", () => {
  describe("concat", () => {
    it("should concatenate two strings", () => {
      const result = lib.concat("Hello", "World")
      expect(result).toBe("HelloWorld")
    })

    it("should return the first string if the second string is empty", () => {
      const result = lib.concat("Hello", "")
      expect(result).toBe("Hello")
    })

    it("should return the first string if the second string is null", () => {
      const result = lib.concat("Hello", null)
      expect(result).toBe("Hello")
    })

    it("should return the first string if the second string is undefined", () => {
      const result = lib.concat("Hello", undefined)
      expect(result).toBe("Hello")
    })

    it("can be used as a reducer", () => {
      expect(reduceBag(["a", "b", null, "c", "d"], lib.concat, "Start:")).toBe("Start:abcd")
    })
  })

  describe("joinReducer", () => {
    const combine = lib.joiner("-")
    let first: Possible<string>
    let second: Possible<string>
    let result: Thunk<Optional<string>>
    beforeEach(() => {
      result = () => combine(first, second)
    })

    describe("when the first string is not empty", () => {
      beforeEach(() => {
        first = "First"
      })

      describe("and the second string is not empty", () => {
        beforeEach(() => {
          second = "Second"
        })
        it("concatenates both strings with the separator", () => {
          expect(result()).toBe("First-Second")
        })
      })

      describe("and the second string is null", () => {
        beforeEach(() => {
          second = null
        })
        it("returns the first string", () => {
          expect(result()).toBe(first)
        })
      })

      describe("and the second string is undefined", () => {
        beforeEach(() => {
          second = undefined
        })
        it("returns the first string", () => {
          expect(result()).toBe(first)
        })
      })

      describe("and the second string is empty", () => {
        beforeEach(() => {
          second = ""
        })
        it("returns the first string and the separator", () => {
          expect(result()).toBe("First-")
        })
      })
    })

    describe("when the first string is null", () => {
      beforeEach(() => {
        first = null
      })

      describe("and the second string is not empty", () => {
        beforeEach(() => {
          second = "Second"
        })
        it("returns the second string", () => {
          expect(result()).toBe(second)
        })
      })

      describe("and the second string is null", () => {
        beforeEach(() => {
          second = null
        })
        it("returns undefined", () => {
          expect(result()).toBeUndefined()
        })
      })

      describe("and the second string is undefined", () => {
        beforeEach(() => {
          second = undefined
        })
        it("returns undefined", () => {
          expect(result()).toBeUndefined()
        })
      })

      describe("and the second string is empty", () => {
        beforeEach(() => {
          second = ""
        })
        it("returns empty", () => {
          expect(result()).toEqual("")
        })
      })
    })

    describe("when the first string is undefined", () => {
      beforeEach(() => {
        first = undefined
      })

      describe("and the second string is not empty", () => {
        beforeEach(() => {
          second = "Second"
        })
        it("returns the second string", () => {
          expect(result()).toBe(second)
        })
      })

      describe("and the second string is null", () => {
        beforeEach(() => {
          second = null
        })
        it("returns undefined", () => {
          expect(result()).toBeUndefined()
        })
      })

      describe("and the second string is undefined", () => {
        beforeEach(() => {
          second = undefined
        })
        it("returns undefined", () => {
          expect(result()).toBeUndefined()
        })
      })

      describe("and the second string is empty", () => {
        beforeEach(() => {
          second = ""
        })
        it("returns empty", () => {
          expect(result()).toEqual("")
        })
      })
    })

    describe("when the first string is empty", () => {
      beforeEach(() => {
        first = ""
      })

      describe("and the second string is not empty", () => {
        beforeEach(() => {
          second = "Second"
        })
        it("returns the separator and the second string", () => {
          expect(result()).toBe("-Second")
        })
      })

      describe("and the second string is null", () => {
        beforeEach(() => {
          second = null
        })
        it("returns empty", () => {
          expect(result()).toEqual("")
        })
      })

      describe("and the second string is undefined", () => {
        beforeEach(() => {
          second = undefined
        })
        it("returns empty", () => {
          expect(result()).toEqual("")
        })
      })

      describe("and the second string is empty", () => {
        beforeEach(() => {
          second = ""
        })
        it("returns the separator", () => {
          expect(result()).toEqual("-")
        })
      })
    })

    it("reduces strings to a separated list", () => {
      expect(reduceSome(["a", "b", "c", "d"], combine, undefined)).toBe("a-b-c-d")
    })

    it("reduces a single string to that string", () => {
      expect(reduceSome("Single", combine, undefined)).toBe("Single")
    })

    it("reduces undefined to the initial state", () => {
      expect(reduceBag(undefined, combine, "Initial")).toBe("Initial")
    })
  })

  describe("reduceCharacters", () => {
    it("reduce the characters in the string", () => {
      const reducer = (state: string, value: string, index: number) => `${state} ${index}:${value}`
      expect(lib.reduceCharacters("abcd", reducer, "Initial")).toEqual("Initial 0:a 1:b 2:c 3:d")
    })
  })

  describe("valueToString", () => {
    it("should convert a number to a string", () => {
      const result = lib.valueToString(42)
      expect(result).toBe("42")
    })

    it("should convert a string to a string", () => {
      const result = lib.valueToString("Hello")
      expect(result).toBe("Hello")
    })

    it("should convert a boolean to a string", () => {
      const result = lib.valueToString(true)
      expect(result).toBe("true")
    })

    it("should convert an object to a string via its toString() function", () => {
      const result = lib.valueToString({ toString: () => "Value of Object" })
      expect(result).toBe("Value of Object")
    })

    it("should convert null to a string", () => {
      const result = lib.valueToString(null)
      expect(result).toBe("null")
    })

    it("should convert undefined to a string", () => {
      const result = lib.valueToString(undefined)
      expect(result).toBe("undefined")
    })

    it("should convert a symbol to a string", () => {
      const result = lib.valueToString(Symbol("Test Symbol"))
      expect(result).toBe("Symbol(Test Symbol)")
    })
  })
})
