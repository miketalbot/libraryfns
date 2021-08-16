import { filter } from "./filter"

const array = [{ name: "mike" }, { name: "bob" }, { x: 2 }]

describe("Filter", function () {
  it("can filter by a fn", () => {
    const results = filter(array, (v) => v.x === 2)
    expect(results).toHaveProperty("length", 1)
  })
  it("can filter by a pick function", () => {
    expect(filter(array, "name")).toHaveLength(2)
  })
})
