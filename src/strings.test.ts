import { valueToString } from "./strings"

describe("valueToString", () => {
  it("should convert a number to a string", () => {
    const result = valueToString(42)
    expect(result).toBe("42")
  })

  it("should convert a string to a string", () => {
    const result = valueToString("Hello")
    expect(result).toBe("Hello")
  })

  it("should convert a boolean to a string", () => {
    const result = valueToString(true)
    expect(result).toBe("true")
  })

  it("should convert an object to a string via its toString() function", () => {
    const result = valueToString({ toString: () => "Value of Object" })
    expect(result).toBe("Value of Object")
  })

  it("should convert null to a string", () => {
    const result = valueToString(null)
    expect(result).toBe("null")
  })

  it("should convert undefined to a string", () => {
    const result = valueToString(undefined)
    expect(result).toBe("undefined")
  })

  it("should convert a symbol to a string", () => {
    const result = valueToString(Symbol("Test Symbol"))
    expect(result).toBe("Symbol(Test Symbol)")
  })
})
