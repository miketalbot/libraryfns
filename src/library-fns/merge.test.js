import { merge } from "./merge"

let data
describe("Merge", () => {
  beforeEach(() => {
    data = [
      { id: "1", name: "mike", value: 4, ar: [{ a: 2 }] },
      { id: "2", name: "Beth", value: 3, ar: ["test", { a: 3, d: { e: 4 } }] },
      { id: "3", name: "Clemency", value: 2, ar: "hello" }
    ]
  })
  it("should merge simple arrays", () => {
    const ar1 = ["a", undefined, "b", "c"]
    const ar2 = [undefined, "b", "C", "d"]
    const result = merge(ar1, ar2)
    expect(result).toMatchObject(["a", "b", "C", "d"])
  })
  it("should merge simple properties", () => {
    const target = { ...data[0] }
    merge(target, { c: 1 })
    expect(target).toMatchObject({
      id: "1",
      name: "mike",
      value: 4,
      ar: [{ a: 2 }],
      c: 1
    })
  })
  it("should merge an inner array with a non array", () => {
    const target = { ...data[0] }
    merge(target, { ar: 1 })
    expect(target).toMatchObject({
      id: "1",
      name: "mike",
      value: 4,
      ar: 1
    })
  })
  it("should merge an inner array with another array", () => {
    const target = { ...data[0] }
    merge(target, { ar: [{ b: 1 }] })
    expect(target).toMatchObject({
      id: "1",
      name: "mike",
      value: 4,
      ar: [{ a: 2, b: 1 }]
    })
  })
  it("should merge an inner array with another array that has more members", () => {
    const target = { ...data[0] }
    merge(target, { ar: [{ b: 1 }, { c: 3 }] })
    expect(target).toMatchObject({
      id: "1",
      name: "mike",
      value: 4,
      ar: [{ a: 2, b: 1 }, { c: 3 }]
    })
  })
  it("should merge an inner array with another array that has complex members", () => {
    const target = { ...data[1] }
    merge(target, { ar: [{ b: 1 }, { c: 3, d: { f: 5 } }] })
    expect(target).toMatchObject({
      id: "2",
      name: "Beth",
      value: 3,
      ar: [{ b: 1 }, { c: 3, d: { f: 5, e: 4 } }]
    })
  })
  it("should merge a top level array", () => {
    const result = merge(data, [{ z: 14, ar: [{ a: 3 }] }])
    expect(result).toHaveProperty("length", 3)
    expect(result[0]).toMatchObject({ z: 14, id: "1", ar: [{ a: 3 }] })
  })
})
