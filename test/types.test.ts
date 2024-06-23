import { describe, expect, it } from "vitest"
import * as lib from "../src/types"

describe("types", () => {
  describe("Explicit<T>", () => {
    it("is assignable to T[]", () => {
      const explicitT: lib.Explicit<number | null> = 29
      const t: number = explicitT
      expect(t).toBe(explicitT)
    })
  })
})
