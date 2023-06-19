import { expect, test } from "vitest"
import { SaveCategory } from "@/application/usecases"
import { CategoryRepositoryMemory } from "@/infra/repositories/memory"

test("Deve criar uma categoria com sucesso", async () => {
  const categoryRepository = new CategoryRepositoryMemory()
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
  const categoryRepository = new CategoryRepositoryMemory()
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
