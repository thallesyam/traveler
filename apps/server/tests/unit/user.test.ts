import { expect, test } from "vitest"
import User from "@/domain/entities/user"
import Password from "@/domain/entities/password"

test("Deve criar um usuário válido", async () => {
  const user = new User(
    "Thalles Ian",
    "thallesyam@gmail.com",
    new Password("admin@123", "salt")
  )
  expect(user).toStrictEqual(user)
})

test("Deve tentar criar um usuário com faltando informação", async () => {
  expect(
    () =>
      new User("", "thallesyam@gmail.com", new Password("admin@123", "salt"))
  ).toThrowError(new Error("Insufficient information to create the user"))
})

test("Deve tentar criar um usuário com email inválido", async () => {
  expect(
    () =>
      new User(
        "Thalles Ian",
        "thallesyam.com",
        new Password("admin@123", "salt")
      )
  ).toThrowError(new Error("Invalid email"))
})
