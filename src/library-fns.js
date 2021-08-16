export const pick = (fn) => (typeof fn === "string" ? (v) => v[fn] : fn)

function applyArrayFn(target, fnName, fn) {
  fn = pick(fn)
  if (Array.isArray(target)) return target[fnName](fn)
  if (target && typeof target === "object")
    return Object.entries(target)[fnName](([key, value]) => fn(value, key))
  throw new Error(`Cannot iterate ${typeof target}`)
}

export function map(target, fn) {
  return applyArrayFn(target, "map", fn)
}

export function filter(target, fn) {
  return target.filter(pick(fn))
}

export function forEach(target, fn) {
  return applyArrayFn(target, "forEach", fn)
}

export function omit(target, props) {
  return Object.fromEntries(
    Object.entries(target).filter(([key]) => !props.includes(key))
  )
}

export function merge(target, ...sources) {
  for (let source of sources) {
    innerMerge(target, source)
  }

  function innerMerge(target, source) {
    for (let [key, value] of Object.entries(source)) {
      target[key] = mergeValue(target[key], value)
    }
  }

  function mergeValue(targetValue, value) {
    if (Array.isArray(value)) {
      if (!Array.isArray(targetValue)) {
        return value
      } else {
        for (let i = 0, l = value.length; i < l; i++) {
          targetValue[i] = mergeValue(targetValue[i], value[i])
        }
      }
    } else if (typeof value === "object") {
      if (targetValue && typeof targetValue === "object") {
        innerMerge(targetValue, value)
      } else {
        return value
      }
    } else {
      return value ?? targetValue ?? undefined
    }
  }
}

export const uniq = (target) => Array.from(new Set(target))

export const uniqBy = (target, fn) => {
  fn = pick(fn)
  const dedupe = new Set()
  return target.filter((v) => {
    const k = fn(v)
    if (dedupe.has(k)) return false
    dedupe.add(k)
    return true
  })
}

export const groupBy = (target, fn) => {
  fn = pick(fn)
  return target
    .map((value) => ({ value, key: fn(value) }))
    .reduce((c, a) => {
      c[a.key] = c[a.key] || []
      c[a.key].push(a.value)
      return c
    }, {})
}

export const keyBy = (target, fn) => {
  fn = pick(fn)
  return target
    .map((value) => ({ value, key: fn(value) }))
    .reduce((c, a) => {
      c[a.key] = a.value
      return c
    }, {})
}

export const get = (object, path, defaultValue) => {
  const parts = path.split(".")
  for (let part of parts) {
    object = object[part]
    if (!object) return defaultValue
  }
  return object
}

export const set = (object, path, value) => {
  const parts = path.split(".")
  for (let i = 0, l = parts.length - 1; i < l; i++) {
    const part = parts[i]
    object = object[part] = object[part] || {}
  }
  object[parts[parts.length - 1]] = value
}

export const sortBy = (array, fn) => {
  fn = pick(fn)
  return array.sort((a, b) => {
    const va = fn(a)
    const vb = fn(b)
    if (va < vb) return -1
    if (va > vb) return 1
    return 0
  })
}

export const debounce = (fn, wait = 0, { maxWait = Infinity } = {}) => {
  let timer = 0
  let startTime = 0
  let running = false
  let pendingParams
  let result = function (...params) {
    pendingParams = params
    if (running && Date.now() - startTime > maxWait) {
      execute()
    } else {
      if (!running) {
        startTime = Date.now()
      }
      running = true
    }

    clearTimeout(timer)
    timer = setTimeout(execute, Math.min(maxWait - startTime, wait))

    function execute() {
      running = false
      fn(...params)
    }
  }
  result.flush = function () {
    if (running) {
      running = false
      clearTimeout(timer)
      fn(...pendingParams)
    }
  }
  result.cancel = function () {
    running = false
    clearTimeout(timer)
  }
  return result
}
