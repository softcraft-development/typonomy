[**Typonomy**](../README.md) • **Docs**

***

[Typonomy](../globals.md) / convertToJson

# Function: convertToJson()

> **convertToJson**(`value`): [`Json`](../type-aliases/Json.md)

Converts an arbitrary value to `Json` as best as possible.
* Some values are preserved as-is:
  *  `null`
  *  `string`
  *  `boolean`
  *  `number` if they are `Finite`.
* Arrays are recursively converted to `Json[]`.
* Objects are recursively converted to `Record<string, Json>`.
  * Keys are converted to strings.
* Any other value becomes `null`, including:
  * `undefined`
  * `NaN`
  * `Infinity`
  * `-Infinity`

## Parameters

• **value**: `unknown`

The value to convert.

## Returns

[`Json`](../type-aliases/Json.md)

A `Json` value that represents the input value.

## Source

[json.ts:27](https://github.com/softcraft-development/typonomy/blob/bcea019d216cf7f686cf96fe07d66281dfcae070/src/json.ts#L27)
