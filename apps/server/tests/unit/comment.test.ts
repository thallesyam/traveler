import { expect, test } from "vitest"
import { Comment } from "@/domain/entities"

test("Deve criar uma cidade válida", async () => {
  const comment = new Comment(
    "Thalles Ian",
    "fake-image",
    "Local muito interessante",
    5,
    "fake-local-id"
  )
  comment.setCommentId("1")
  expect(comment.name).toBe("Thalles Ian")
  expect(comment.image).toBe("fake-image")
  expect(comment.text).toBe("Local muito interessante")
  expect(comment.rating).toBe(5)
  expect(comment.getStatus()).toBe(undefined)
  expect(comment.getCommentId()).toBeTruthy()
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
