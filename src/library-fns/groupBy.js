import { pick } from "./pick"

export function groupBy(target, fn) {
  fn = pick(fn)
  return target
    .map((value) => ({ value, key: fn(value) }))
    .reduce((c, a) => {
      c[a.key] = c[a.key] || []
      c[a.key].push(a.value)
      return c
    }, {})
}
