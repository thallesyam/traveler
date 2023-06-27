import { test, expect, beforeAll, beforeEach } from "vitest"
import { PrismaClient } from "@prisma/client"
import { Login } from "@/application/usecases"
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

test("Deve realizar o login com sucesso", async () => {
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
  expect(token).toBe(token)
})

test("Deve realizar o login com um email inválido", async () => {
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
    password: "admin@admin",
  }
  const tokenGateway = new JsonWebToken("fake-key")
  const login = new Login(userRepository, tokenGateway)
  expect(async () => await login.execute(input)).rejects.toThrowError(
    new Error("Email ou senha inválido")
  )
})

test("Deve realizar o login com uma senha inválida", async () => {
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
    email: "thallesyam1@gmail.com",
    password: "admin@admin",
  }
  const tokenGateway = new JsonWebToken("fake-key")
  const login = new Login(userRepository, tokenGateway)
  expect(async () => await login.execute(input)).rejects.toThrowError(
    new Error("Email ou senha inválido")
  )
})
