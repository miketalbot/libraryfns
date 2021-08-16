import { pick } from "./pick"

export function keyBy(target, fn) {
  fn = pick(fn)
  return target
    .map((value) => ({ value, key: fn(value) }))
    .reduce((c, a) => {
      c[a.key] = a.value
      return c
    }, {})
}
