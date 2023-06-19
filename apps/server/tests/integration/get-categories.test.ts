import { expect, test } from "vitest"
import { CategoryRepositoryMemory } from "@/infra/repositories/memory"
import { SaveCategory } from "@/application/usecases"
import { GetCategories } from "@/application/usecases"

test("Deve buscar todas as categorias com sucesso", async () => {
  const categoryRepository = new CategoryRepositoryMemory()
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
  const categoryRepository = new CategoryRepositoryMemory()
  const getCategories = new GetCategories(categoryRepository)
  const cities = await getCategories.execute()
  expect(cities.length).toBe(0)
})
