import { expect, test } from "vitest"
import { SaveCategory } from "@/application/usecases"
import { MemoryRepository } from "@/infra/factories"

test("Deve criar uma categoria com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
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
