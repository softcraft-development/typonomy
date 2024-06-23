import { describe, expect, it } from "vitest"
import * as lib from "../src/break"

describe("break", () => {
  describe("BreakException", () => {
    describe("toString", () => {
      it("returns the message", () => {
        expect(new lib.BreakExecution("Test Message").toString()).toEqual("Test Message")
      })
    })
  })

  describe("isBreakExecution", () => {
    it("returns true for a BreakExecution", () => {
      expect(lib.isBreakExecution(new lib.BreakExecution())).toBe(true)
    })

    it("returns true for Break", () => {
      expect(lib.isBreakExecution(lib.Break)).toBe(true)
    })

    it("returns false for an Error", () => {
      expect(lib.isBreakExecution(new Error())).toBe(false)
    })

    it("returns false for undefined", () => {
      expect(lib.isBreakExecution(undefined)).toBe(false)
    })

    it("returns false for null", () => {
      expect(lib.isBreakExecution(null)).toBe(false)
    })

    it("returns false for an object with a message", () => {
      expect(lib.isBreakExecution({ message: "Test" })).toBe(false)
    })
  })

  describe("onBreakExecution", () => {
    it("returns the return value for a BreakExecution", () => {
      const value = { key: "Test" }
      expect(lib.onBreakExecution(lib.Break, value)).toBe(value)
    })

    it("throws anything other than a BreakExecution", () => {
      const exception = new Error("Test")
      expect(() => lib.onBreakExecution(exception, "whatever")).toThrow(exception)
    })
  })
})
