import { pick } from "./pick"

export function filter(target, fn) {
  return target.filter(pick(fn))
}
