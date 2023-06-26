import { expect, test } from "vitest"
import { SaveCategory, GetCategoryById } from "@/application/usecases"
import { Category } from "@/domain/entities"
import { MemoryRepository } from "@/infra/factories"

test("Deve buscar uma categoria por id com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const input = {
    name: "Rio de Janeiro",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  const category = (await categoryRepository.findByName(input.name)) as Category
  const getCategoryById = new GetCategoryById(categoryRepository)
  const cityById = await getCategoryById.execute({
    id: category.getCategoryId(),
  })
  expect(cityById.name).toStrictEqual(input.name)
  expect(cityById.image).toStrictEqual(input.image)
})

test("Deve buscar uma categoria com id inexistente", async () => {
  const repositoryFactory = new MemoryRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const input = {
    name: "Rio de Janeiro",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  const getCategoryById = new GetCategoryById(categoryRepository)
  expect(
    async () => await getCategoryById.execute({ id: "1" })
  ).rejects.toThrowError(new Error("Category not found"))
})
