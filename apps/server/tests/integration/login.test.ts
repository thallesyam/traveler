import { test, expect } from "vitest"

import User from "@/domain/entities/user"
import UserRepositoryMemory from "@/infra/repositories/memory/user"
import Login from "@/application/usecases/login"
import Password from "@/domain/entities/password"

test("Deve realizar o login com sucesso", async () => {
  const user = new User(
    "Thalles Ian",
    "thallesyam@gmail.com",
    new Password("admin@123", "salt")
  )
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const input = {
    email: user.email,
    password: user.password,
  }
  const login = new Login(userRepository)
  const { token } = await login.execute(input)
  expect(token).toBe("123")
})

test("Deve realizar o login com um email inválido", async () => {
  const user = new User(
    "Thalles Ian",
    "thallesyam@gmail.com",
    new Password("admin@123", "salt")
  )
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const input = {
    email: "thallesyam1@gmail.com",
    password: user.password,
  }
  const login = new Login(userRepository)
  expect(async () => await login.execute(input)).rejects.toThrowError(
    new Error("Email ou senha inválido")
  )
})

test("Deve realizar o login com uma senha inválida", async () => {
  const user = new User(
    "Thalles Ian",
    "thallesyam@gmail.com",
    new Password("admin@123", "salt")
  )
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const input = {
    email: user.email,
    password: new Password("admin@admin", "salt"),
  }
  const login = new Login(userRepository)
  expect(async () => await login.execute(input)).rejects.toThrowError(
    new Error("Email ou senha inválido")
  )
})

test("Deve realizar o login com uma senha inválida", async () => {
  const user = new User(
    "Thalles Ian",
    "thallesyam@gmail.com",
    new Password("admin@123", "salt")
  )
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const input = {
    email: "thallesyam1@gmail.com",
    password: new Password("admin@admin", "salt"),
  }
  const login = new Login(userRepository)
  expect(async () => await login.execute(input)).rejects.toThrowError(
    new Error("Email ou senha inválido")
  )
})
