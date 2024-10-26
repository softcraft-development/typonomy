import { describe, expect, it } from "vitest"
import * as lib from "../../src/arrays"
import { Break } from "../../src/break"
import type { Optional } from "../../src/types"

describe("mapArray", () => {
  it("maps an array of values", () => {
    expect(lib.mapArray([3, 5, 7], (value, index) => `${index}:${value}`)).toEqual(["0:3", "1:5", "2:7"])
  })

  describe("when the mapper breaks execution", () => {
    it("maps only the prior elements", () => {
      expect(lib.mapArray([3, 5, 7], (value, index) => {
        if (index === 2) throw Break
        return `${index}:${value}`
      })).toEqual(["0:3", "1:5"])
    })
  })
})

describe("mapReducer", () => {
  it("creates an array Reducer for a mapper", () => {
    const mapper = (value: Optional<number>, index: number) => ((value || 0) + index).toString()
    const reducer = lib.mapReducer(mapper)
    expect(reducer(["initial"], 42, -1)).toEqual(["initial", "41"])
  })
})
