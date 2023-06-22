import { expect, test } from "vitest"
import { Comment } from "@/domain/entities"

test("Deve criar uma cidade válida", async () => {
  const city = new Comment(
    "Thalles Ian",
    "fake-image",
    "Local muito interessante",
    5,
    "fake-local-id"
  )
  expect(city.name).toBe("Thalles Ian")
  expect(city.image).toBe("fake-image")
  expect(city.text).toBe("Local muito interessante")
  expect(city.rating).toBe(5)
  expect(city.getStatus()).toBe(undefined)
  expect(city.getCommentId()).toBeTruthy()
})

test("Deve tentar criar uma cidade informação", async () => {
  expect(
    () =>
      new Comment(
        "",
        "fake-image",
        "Local muito interessante",
        5,
        "fake-local-id"
      )
  ).toThrowError(new Error("Insufficient information to create a comment"))
})
