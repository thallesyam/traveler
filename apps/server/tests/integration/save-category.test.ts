import { beforeAll, beforeEach, expect, test } from "vitest"
import { PrismaClient } from "@prisma/client"
import { SaveCategory } from "@/application/usecases"
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

test("Deve criar uma categoria com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const input = {
    name: "Rio de Janeiro",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  const categories = await categoryRepository.findAll()
  expect(categories).toHaveLength(1)
})

test("Deve tentar criar uma categoria duplicada", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const input = {
    name: "Rio de Janeiro",
    image: "fake-image",
  }
  const input1 = {
    name: "Rio de Janeiro",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  expect(async () => await saveCategory.execute(input1)).rejects.toThrow(
    new Error("A category with that name already exists")
  )
})
