import { applyArrayFn } from "./applyArrayFn"

export function map(target, fn) {
  return applyArrayFn(target, "map", fn)
}
