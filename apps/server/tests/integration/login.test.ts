import { test, expect } from "vitest"

import User from "@/domain/entities/user"
import UserRepositoryMemory from "@/infra/repositories/memory/user"
import Login from "@/application/usecases/login"
import JsonWebToken from "@/infra/gateways/json-web-token"

test("Deve realizar o login com sucesso", async () => {
  const user = await User.create(
    "Thalles Ian",
    "thallesyam@gmail.com",
    "admin@123"
  )

  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const input = {
    email: user.email,
    password: "admin@123",
  }
  const tokenGateway = new JsonWebToken("fake-key")
  const login = new Login(userRepository, tokenGateway)
  const { token } = await login.execute(input)
  expect(token).toBe(token)
})

test("Deve realizar o login com um email inválido", async () => {
  const user = await User.create(
    "Thalles Ian",
    "thallesyam@gmail.com",
    "admin@123"
  )
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)

  const input = {
    email: "thallesyam1@gmail.com",
    password: "admin@123",
  }
  const tokenGateway = new JsonWebToken("fake-key")
  const login = new Login(userRepository, tokenGateway)
  expect(async () => await login.execute(input)).rejects.toThrowError(
    new Error("Email ou senha inválido")
  )
})

test("Deve realizar o login com uma senha inválida", async () => {
  const user = await User.create(
    "Thalles Ian",
    "thallesyam@gmail.com",
    "admin@123"
  )
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const input = {
    email: user.email,
    password: "admin@admin",
  }
  const tokenGateway = new JsonWebToken("fake-key")
  const login = new Login(userRepository, tokenGateway)
  expect(async () => await login.execute(input)).rejects.toThrowError(
    new Error("Email ou senha inválido")
  )
})

test("Deve realizar o login com uma senha inválida", async () => {
  const user = await User.create(
    "Thalles Ian",
    "thallesyam@gmail.com",
    "admin@123"
  )
  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const input = {
    email: "thallesyam1@gmail.com",
    password: "admin@admin",
  }
  const tokenGateway = new JsonWebToken("fake-key")
  const login = new Login(userRepository, tokenGateway)
  expect(async () => await login.execute(input)).rejects.toThrowError(
    new Error("Email ou senha inválido")
  )
})
