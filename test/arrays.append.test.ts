import { describe, expect, it } from "vitest"
import * as lib from "../src/arrays"

describe("append", () => {
  it("should append the value to the array", () => {
    const array = [1, 1, 2, 3]
    const result = lib.append(array, 5)
    expect(result).toEqual([1, 1, 2, 3, 5])
  })

  it("should not mutate the original array", () => {
    const array = [1, 1, 2, 3]
    const result = lib.append(array, 7)
    expect(result).not.toBe(array)
  })
})

describe("appendExplicit", () => {
  it("adds a definite value", () => {
    const result = lib.appendExplicit<string>([], "Explicit")
    expect(result).toEqual(["Explicit"])
  })

  it("does not adds a null", () => {
    const result = lib.appendExplicit<string>([], null)
    expect(result).toEqual([])
  })

  it("does not adds undefined", () => {
    const result = lib.appendExplicit<string>([], undefined)
    expect(result).toEqual([])
  })

  it("should not mutate the original array", () => {
    const array = [1, 1, 2, 3]
    const result = lib.appendExplicit(array, 7)
    expect(result).not.toBe(array)
  })
})
