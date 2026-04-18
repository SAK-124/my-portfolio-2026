export function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function isString(v: unknown): v is string {
  return typeof v === 'string'
}

export function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every(isString)
}

export function isArrayOf<T>(v: unknown, guard: (x: unknown) => x is T): v is T[] {
  return Array.isArray(v) && v.every(guard)
}
