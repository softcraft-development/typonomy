import { beforeEach, describe, expect, it } from "vitest"
import * as lib from "../../src/bags"
import type { Bag, Optional, Thunk } from "../../src/types"

describe("bag", () => {
  interface TestType { key: string }
  let bag: Bag<TestType>
  let element: Optional<TestType>
  let result: Thunk<Bag<TestType>>

  beforeEach(() => {
    result = () => lib.bag(bag, element)
  })

  describe("when the bag is undefined", () => {
    beforeEach(() => {
      bag = undefined
    })

    describe("and the element is undefined", () => {
      beforeEach(() => {
        element = undefined
      })
      it("returns undefined", () => {
        expect(result()).toBeUndefined()
      })
    })

    describe("and the element is defined", () => {
      beforeEach(() => {
        element = { key: "Element" }
      })
      it("returns the element", () => {
        expect(result()).toBe(element)
      })
    })
  })

  describe("when the bag is singular", () => {
    beforeEach(() => {
      bag = { key: "Bag" }
    })

    describe("and the element is undefined", () => {
      beforeEach(() => {
        element = undefined
      })
      it("returns the bag", () => {
        expect(result()).toBe(bag)
      })
    })

    describe("and the element is defined", () => {
      beforeEach(() => {
        element = { key: "Element" }
      })
      it("returns the a new array with both elements", () => {
        expect(result()).toEqual([bag, element])
      })
    })
  })

  describe("when the bag is plural", () => {
    beforeEach(() => {
      bag = [{ key: "First" }, { key: "Second" }]
    })

    describe("and the element is undefined", () => {
      beforeEach(() => {
        element = undefined
      })
      it("returns the bag", () => {
        expect(result()).toBe(bag)
      })
    })

    describe("and the element is defined", () => {
      beforeEach(() => {
        element = { key: "Element" }
      })
      it("pushes the new elements", () => {
        expect(result()).toBe(bag)
        expect(bag).toContain(element)
      })
    })
  })
})

describe("bagSize", () => {
  let bag: Bag<string>
  describe("for undefined", () => {
    beforeEach(() => {
      bag = undefined
    })

    it("is zero", () => {
      expect(lib.bagSize(bag)).toEqual(0)
    })
  })

  describe("for a single item", () => {
    beforeEach(() => {
      bag = "A single item"
    })

    it("is one", () => {
      expect(lib.bagSize(bag)).toEqual(1)
    })
  })

  describe("for multiple items", () => {
    beforeEach(() => {
      bag = lib.bag("First", "Second")
    })

    it("is the number of items", () => {
      expect(lib.bagSize(bag)).toEqual(2)
    })
  })
})
