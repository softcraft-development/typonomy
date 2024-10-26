import { beforeEach, describe, expect, it } from "vitest"
import { reduceBag } from "../src/bags"
import { reduceSome } from "../src/some"
import * as lib from "../src/strings"
import type { Optional, Possible, Thunk } from "../src/types"

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
