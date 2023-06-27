import { beforeAll, beforeEach, expect, test } from "vitest"
import { PrismaClient } from "@prisma/client"
import { SaveCategory, GetCategories } from "@/application/usecases"
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

test("Deve buscar todas as categorias com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const input = {
    name: "Rio de Janeiro",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  const getCategories = new GetCategories(categoryRepository)
  const cities = await getCategories.execute()
  expect(cities.length).toBe(1)
})

test("Deve buscar uma categorias e não encontrar nenhuma", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const getCategories = new GetCategories(categoryRepository)
  const cities = await getCategories.execute()
  expect(cities.length).toBe(0)
})
