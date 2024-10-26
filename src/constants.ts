import * as types from "./types"

// Asserting a branded type.
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const negativeInfinity = -Infinity as types.NegativeInfinity

// Asserting a branded type.
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const notANumber = NaN as types.NotANumber

// Asserting a branded type.
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const positiveInfinity = Infinity as types.PositiveInfinity
