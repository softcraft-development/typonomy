import { describe, expect, it } from "vitest"
import * as lib from "../src/fp"

describe("curry", () => {
  it("curries a combine", () => {
    const combine = (a: number, b: string) => `A: ${a}, B: ${b}`
    const curried = lib.curry(combine)
    expect(curried(3)("A String")).toEqual("A: 3, B: A String")
  })
})

describe("curryLeft", () => {
  it("curries the first parameter of a 3-arity function", () => {
    const fn = (a: number, b: number, c: number) => `A: ${a}, B: ${b} C: ${c}`
    const curried = lib.curryLeft(fn)
    expect(curried(3)(5, 7)).toEqual(fn(3, 5, 7))
  })
})

describe("curryMiddle", () => {
  it("curries the second parameter of a 3-arity function", () => {
    const fn = (a: number, b: number, c: number) => `A: ${a}, B: ${b} C: ${c}`
    const curried = lib.curryMiddle(fn)
    expect(curried(5)(3, 7)).toEqual(fn(3, 5, 7))
  })
})

describe("curryRight", () => {
  it("curries the third parameter of a 3-arity function", () => {
    const fn = (a: number, b: number, c: number) => `A: ${a}, B: ${b} C: ${c}`
    const curried = lib.curryRight(fn)
    expect(curried(7)(3, 5)).toEqual(fn(3, 5, 7))
  })
})

describe("uncurry", () => {
  it("creates a Combine from curried Transforms", () => {
    const curried = (a: number) => (b: string) => `A: ${a}, B: ${b}`
    const combine = lib.uncurry(curried)
    expect(combine(3, "A String")).toEqual("A: 3, B: A String")
  })
})

describe("unyrruc", () => {
  it("creates a Combine from curried Transforms", () => {
    const curried = (a: number) => (b: string) => `A: ${a}, B: ${b}`
    const combine = lib.unyrruc(curried)
    expect(combine("A String", 5)).toEqual("A: 5, B: A String")
  })
})

describe("yrruc", () => {
  it("reverse curries a combine", () => {
    const combine = (a: number, b: string) => `A: ${a}, B: ${b}`
    const curried = lib.yrruc(combine)
    expect(curried("A String")(3)).toEqual("A: 3, B: A String")
  })
})
