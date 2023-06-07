import { expect, test } from "vitest"

import { UserRepositoryMemory } from "@/infra/repositories/memory"
import { JsonWebToken } from "@/infra/gateways"
import { Login } from "@/application/usecases"
import { User } from "@/domain/entities"
import CheckAuth from "@/application/usecases/check-auth"

test("Deve realizar a autenticação corretamente", async () => {
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
  const checkAuth = new CheckAuth(tokenGateway)
  const userAuth = await checkAuth.execute({ token })
  expect(userAuth.email).toBe(input.email)
})

test("Deve realizar a autenticação com token inválido", async () => {
  const user = await User.create(
    "Thalles Ian",
    "thallesyam@gmail.com",
    "admin@123"
  )

  const userRepository = new UserRepositoryMemory()
  await userRepository.save(user)
  const tokenGateway = new JsonWebToken("fake-key")
  const checkAuth = new CheckAuth(tokenGateway)
  expect(
    async () => await checkAuth.execute({ token: "fake-token" })
  ).rejects.toThrowError("Token malformated")
})
