import { describe, expect, it } from "vitest"
import * as lib from "../src/logic"
import { isNumber } from "../src/numbers"
import { isObject } from "../src/objects"
import { isString } from "../src/strings"

describe("and", () => {
  it("returns true if both input Predicates are true", () => {
    const a = isNumber
    const b = (value: unknown) => String(value) === "42"
    const combined = lib.and(a, b)
    expect(combined(42)).toBe(true)
  })

  it("returns true if both input Predicates are true", () => {
    const a = isNumber
    const b = (value: unknown) => String(value) === "42"
    const combined = lib.and(a, b)
    expect(combined(17)).toBe(false)
  })
})

describe("all", () => {
  it("returns true if all input Predicates are true", () => {
    const a = isNumber
    const b = (value: unknown) => String(value).length == 2
    const c = (value: unknown) => String(value)[0] === "1"
    const combined = lib.all(a, b, c)
    expect(combined(10)).toBe(true)
  })

  it("returns false if any input Predicates are false", () => {
    const a = isNumber
    const b = (value: unknown) => String(value).length == 2
    const c = (value: unknown) => String(value)[0] === "1"
    const combined = lib.all(a, b, c)
    expect(combined("10")).toBe(false)
  })
})

describe("not", () => {
  it("returns the negation of the input Predicate", () => {
    const negatedGuard = lib.not(isString)
    expect(negatedGuard("hello")).toBe(false)
  })
})

describe("or", () => {
  it("returns true if either input Predicate are true", () => {
    const typeGuard1 = (value: unknown) => typeof value === "string"
    const typeGuard2 = (value: unknown) => typeof value === "number"
    const combinedGuard = lib.or(typeGuard1, typeGuard2)
    expect(combinedGuard("hello")).toBe(true)
  })

  it("returns false if both input Predicate are false", () => {
    const typeGuard1 = (value: unknown) => typeof value === "string"
    const typeGuard2 = (value: unknown) => typeof value === "number"
    const combinedGuard = lib.or(typeGuard1, typeGuard2)
    expect(combinedGuard(true)).toBe(false)
  })
})

describe("some", () => {
  it("returns true if any input Predicates is true", () => {
    const combined = lib.some(isObject, value => value === 37, value => value === "42")
    expect(combined({})).toBe(true)
  })

  it("returns false if all input Predicates is true", () => {
    const combined = lib.some(isObject, value => value === 37, value => value === "42")
    expect(combined("37")).toBe(false)
  })
})
