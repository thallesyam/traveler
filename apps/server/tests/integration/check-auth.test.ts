import { beforeAll, beforeEach, expect, test } from "vitest"
import { PrismaClient } from "@prisma/client"
import { Login, CheckAuth } from "@/application/usecases"
import { User } from "@/domain/entities"
import { JsonWebToken } from "@/infra/gateways"
import { DatabaseRepository, MemoryRepository } from "@/infra/factories"

// let prisma: PrismaClient

// beforeAll(() => {
//   prisma = new PrismaClient()
// })

// beforeEach(async () => {
//   await prisma.comment.deleteMany()
//   await prisma.local.deleteMany()
//   await prisma.category.deleteMany()
//   await prisma.city.deleteMany()
//   await prisma.user.deleteMany()
// })

test("Deve realizar a autenticação corretamente", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const userRepository = repositoryFactory.createUserRepository()
  const user = await User.create(
    "Thalles Ian",
    "thallesyam@gmail.com",
    "admin@123"
  )
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
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const userRepository = repositoryFactory.createUserRepository()
  const user = await User.create(
    "Thalles Ian",
    "thallesyam@gmail.com",
    "admin@123"
  )

  await userRepository.save(user)
  const tokenGateway = new JsonWebToken("fake-key")
  const checkAuth = new CheckAuth(tokenGateway)
  expect(
    async () => await checkAuth.execute({ token: "fake-token" })
  ).rejects.toThrowError("Token malformated")
})
