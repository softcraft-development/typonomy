import { describe, expect, it } from "vitest"
import * as lib from "../../src/arrays"

describe("push", () => {
  it("should add the value to the array", () => {
    const array = [1, 1, 2, 3]
    const result = lib.push(array, 5)
    expect(result).toEqual([1, 1, 2, 3, 5])
  })

  it("should mutate the original array", () => {
    const array = [1, 1, 2, 3]
    const result = lib.push(array, 7)
    expect(result).toBe(array)
  })
})

describe("pushExplicit", () => {
  it("adds a definite value", () => {
    const result = lib.pushExplicit<string>([], "Explicit")
    expect(result).toEqual(["Explicit"])
  })

  it("does not add a null", () => {
    const result = lib.pushExplicit<string>([], null)
    expect(result).toEqual([])
  })

  it("does not add undefined", () => {
    const result = lib.pushExplicit<string>([], undefined)
    expect(result).toEqual([])
  })

  it("should mutate the original array", () => {
    const array = [1, 1, 2, 3]
    const result = lib.pushExplicit(array, 7)
    expect(result).toBe(array)
  })
})
