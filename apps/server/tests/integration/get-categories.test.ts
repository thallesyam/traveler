import { expect, test } from "vitest"
import { SaveCategory, GetCategories } from "@/application/usecases"
import { MemoryRepository } from "@/infra/factories"

test("Deve buscar todas as categorias com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
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
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const getCategories = new GetCategories(categoryRepository)
  const cities = await getCategories.execute()
  expect(cities.length).toBe(0)
})
