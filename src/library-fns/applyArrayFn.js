import { pick } from "./pick"

export function applyArrayFn(target, fnName, fn) {
  fn = pick(fn)
  if (Array.isArray(target)) return target[fnName](fn)
  if (target && typeof target === "object")
    return Object.entries(target)[fnName](([key, value]) => fn(value, key))
  throw new Error(`Cannot iterate ${typeof target}`)
}
