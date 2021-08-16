import { keyBy } from "./keyBy"

const data = [
  { id: "1", name: "mike", value: 4 },
  { id: "2", name: "Beth", value: 3 },
  { id: "3", name: "Clemency", value: 2 }
]

describe("keyBy", () => {
  it("should be able to key by a function", () => {
    const keyed = keyBy(data, (v) => v.value)
    expect(keyed[2]).toMatchObject({ id: "3" })
    expect(keyed[4]).toMatchObject({ name: "mike" })
  })

  it("should be able to key by a pick fn", () => {
    const keyed = keyBy(data, "name")
    expect(keyed.mike).toMatchObject({ value: 4 })
  })
})
