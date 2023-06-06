import { expect, test } from "vitest"
import User from "@/domain/entities/user"

test("Deve criar um usuário válido", async () => {
  const user = new User("Thalles Ian", "thallesyam@gmail.com", "admin@123")
  expect(user).toStrictEqual(user)
})

test("Deve tentar criar um usuário com email inválido", async () => {
  expect(() => new User("Thalles Ian", "", "admin@123")).toThrowError(
    new Error("Insufficient information to create the user")
  )
})
