import { applyArrayFn } from "./applyArrayFn"

export function forEach(target, fn) {
  return applyArrayFn(target, "forEach", fn)
}
