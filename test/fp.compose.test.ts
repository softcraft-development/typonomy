import { describe, expect, it } from "vitest"
import * as lib from "../src/fp"
import { valueToString } from "../src/strings"

describe("compose", () => {
  it("creates a transform from the input to result type", () => {
    const toIntermediate = (value: string) => value.length
    const toResult = valueToString
    const composed = lib.compose(toIntermediate, toResult)
    expect(composed("Hello")).toBe("5")
  })
})

describe("composeDown", () => {
  it("creates a new Combine from a Combine and a transform for the result", () => {
    const intermediate = (a: number, b: number): number => a + b
    const transform = valueToString
    const combine = lib.composeDown(intermediate, transform)
    expect(combine(3, 5)).toEqual("8")
  })
})

describe("composeLeft", () => {
  it("creates a new Combine from a Combine and a transform for the left type", () => {
    const intermediate = (a: number, b: number): number => a + b
    const transform = (value: string) => parseInt(value, 10)
    const combine = lib.composeLeft(transform, intermediate)
    expect(combine("7", 11)).toEqual(18)
  })
})

describe("composeReducer", () => {
  it("creates a new reducer via the Combine function", () => {
    const combine = (value: number, key: string): string => valueToString(value + key.length)
    const reduceIntermediate = (state: string, value: string, key: string): string => `${state} ${key}=${value}`
    const reducer = lib.composeReducer(combine, reduceIntermediate)
    expect(reducer("Start", 3, "test")).toEqual("Start test=7")
  })
})

describe("composeRight", () => {
  it("creates a new Combine from a Combine and a transform for the right type", () => {
    const transform = (value: string) => parseInt(value, 10)
    const intermediate = (a: number, b: number): number => a + b
    const combine = lib.composeRight(transform, intermediate)
    expect(combine(13, "17")).toEqual(30)
  })
})
