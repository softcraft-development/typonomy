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
  describe("Has<T>", () => {
    it("declares that the object has a property with the given type", () => {
      const obj: lib.Has<"a", number> = { a: 29 }
      expect(obj.a).toBe(29)
    })
  })
})
