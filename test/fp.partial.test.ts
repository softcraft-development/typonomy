import { describe, expect, it } from "vitest"
import * as lib from "../src/fp"
import { valueToString } from "../src/strings"

describe("partial", () => {
  it("partially applies a value to the parameter of a Transform", () => {
    const thunk = lib.partial(valueToString, 23)
    expect(thunk()).toBe("23")
  })
})

describe("partialLeft", () => {
  it("partially applies a parameter to the left parameter of a Combine", () => {
    const divide = (a: number, b: number) => a / b
    const invert = lib.partialLeft(divide, 1)
    expect(invert(10)).toBe(0.1)
  })
})

describe("partialRight", () => {
  it("partially applies a parameter to the right parameter of a Combine", () => {
    const divide = (a: number, b: number) => a / b
    const half = lib.partialRight(divide, 2)
    expect(half(6)).toBe(3)
  })
})
