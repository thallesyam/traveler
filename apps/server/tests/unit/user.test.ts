import { expect, test } from "vitest"
import { User } from "@/domain/entities"

test("Deve criar um usuário válido", async () => {
  const user = await User.create(
    "Thalles Ian",
    "thallesyam@gmail.com",
    "admin@123"
  )
  expect(user.name).toBe("Thalles Ian")
  expect(user.email).toBe("thallesyam@gmail.com")
  expect(user.password.value).toBe(
    "338e439d143f507a83fce6724f7fbe71c95bc565d674b6cd280f711b094acfd456e70e1e0dad0c31d2f5131cc5e21814e5ae98331f6a3020ff16fc55c1bba32e"
  )
  expect(user.password.salt).toBe("salt")
})

test("Deve tentar criar um usuário com faltando informação", async () => {
  expect(async () =>
    User.create("", "thallesyamasd@gmail.com", "admin@123")
  ).rejects.toThrowError(
    new Error("Insufficient information to create the user")
  )
})

test("Deve tentar criar um usuário com email inválido", async () => {
  expect(async () =>
    User.create("Thalles Ian", "thallesyam.com", "admin@123")
  ).rejects.toThrowError(new Error("Invalid email"))
})
