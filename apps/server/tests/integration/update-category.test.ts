import { expect, test } from "vitest"
import { CategoryRepositoryMemory } from "@/infra/repositories/memory"
import { SaveCategory, UpdateCategory } from "@/application/usecases"
import { Category } from "@/domain/entities"
import { MemoryRepository } from "@/infra/factories"

test("Deve editar todos os dados de uma categoria com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const input = {
    name: "Ponto turistico",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  const category = (await categoryRepository.findByName(input.name)) as Category
  const newCategoryData = {
    name: "Evento",
    image: "fake-image-evento",
  }
  const updateCategory = new UpdateCategory(categoryRepository)
  await updateCategory.execute({
    id: category.getCategoryId(),
    data: newCategoryData,
  })
  const updatedCategory = await categoryRepository.findById(
    category.getCategoryId()
  )
  expect(newCategoryData.name).toEqual(updatedCategory.name)
  expect(newCategoryData.image).toEqual(updatedCategory.image)
})

test("Deve editar apenas um dos dados de uma categoria com sucesso utilizando nome", async () => {
  const repositoryFactory = new MemoryRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const input = {
    name: "Ponto turistico",
    image: "fake-image",
  }
  const input1 = {
    name: "Praias",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  await saveCategory.execute(input1)
  const category = (await categoryRepository.findByName(input.name)) as Category
  const newCategoryData = {
    name: "Evento",
  }
  const updateCategory = new UpdateCategory(categoryRepository)
  await updateCategory.execute({
    id: category.getCategoryId(),
    data: newCategoryData,
  })
  const updatedCategory = await categoryRepository.findById(
    category.getCategoryId()
  )
  expect(newCategoryData.name).toEqual(updatedCategory.name)
})

test("Deve editar apenas um dos dados de uma categoria com sucesso utilizando imagem", async () => {
  const repositoryFactory = new MemoryRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const input = {
    name: "Ponto turistico",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  const category = (await categoryRepository.findByName(input.name)) as Category
  const newCategoryData = {
    image: "fake-image1",
  }
  const updateCategory = new UpdateCategory(categoryRepository)
  await updateCategory.execute({
    id: category.getCategoryId(),
    data: newCategoryData,
  })
  const updatedCategory = await categoryRepository.findById(
    category.getCategoryId()
  )
  expect(newCategoryData.image).toEqual(updatedCategory.image)
})

test("Deve tentar editar os dados de uma categoria com id errado", async () => {
  const repositoryFactory = new MemoryRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const input = {
    name: "Ponto turistico",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  const newCategoryData = {
    name: "Evento",
  }
  const updateCategory = new UpdateCategory(categoryRepository)
  expect(
    async () =>
      await updateCategory.execute({ id: "fakeId", data: newCategoryData })
  ).rejects.toThrow(new Error("Category not found"))
})
