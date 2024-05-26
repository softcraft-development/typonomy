import { default as func } from "./func"
import { default as nullish } from "./nullish"

/**
 * The default export of the module.
 *
 * @property {FuncMembers} func - Functional programming.
 * @property {NullishMembers} nullish - Handling `null` and `undefined`.
 */
const defaultExport = { func, nullish }
export type Members = typeof defaultExport
export default defaultExport
