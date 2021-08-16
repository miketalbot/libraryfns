export function omit(target, props) {
  return Object.fromEntries(
    Object.entries(target).filter(([key]) => !props.includes(key))
  )
}
