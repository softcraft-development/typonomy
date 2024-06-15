import type { Key, Transform } from "./func"

export type TypeGuard = Transform<unknown, boolean>

export function and(a: TypeGuard, b: TypeGuard): TypeGuard {
  return (value: unknown) => a(value) && b(value)
}

export function all(...guards: TypeGuard[]): TypeGuard {
  return (value: unknown) => guards.every(guard => guard(value))
}

export function any(...guards: TypeGuard[]): TypeGuard {
  return (value: unknown) => guards.some(guard => guard(value))
}

export function isArrayOf<T>(value: unknown, typeGuard: TypeGuard): value is T[] {
  return Array.isArray(value) && value.every(item => typeGuard(item))
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number"
}

export function isKey(value: unknown): value is Key {
  return isString(value) || isNumber(value)
}

export function isObject(value: unknown): value is object {
  return typeof value === "object"
}

export function isRecordOf<K extends Key, V>(
  value: unknown,
  valueGuard: TypeGuard,
  keyGuard: TypeGuard = isKey
): value is Record<K, V> {
  return isObject(value) && Object.entries(value).every(([key, value]) => keyGuard(key) && valueGuard(value))
}

export function is<T extends { [key: string]: unknown }>(
  value: unknown,
  properties: { [K in keyof T]: TypeGuard }
): value is T {
  if (!isObject(value)) return false
  const obj = value as Record<string, unknown>
  return Object.keys(properties).every((key) => {
    const guard = properties[key as keyof T]
    return guard(obj[key])
  })
}

export function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function not(guard: TypeGuard): TypeGuard {
  return (value: unknown) => !guard(value)
}

export function or(a: TypeGuard, b: TypeGuard): TypeGuard {
  return (value: unknown) => a(value) || b(value)
}
