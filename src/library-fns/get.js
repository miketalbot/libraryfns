export function get(object, path, defaultValue) {
  const parts = path.split(".")
  for (let part of parts) {
    object = object[part]
    if (!object) return defaultValue
  }
  return object
}
