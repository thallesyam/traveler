import { expect, test } from "vitest"
import {
  CategoryRepositoryMemory,
  CityRepositoryMemory,
  LocalRepositoryMemory,
} from "@/infra/repositories/memory"
import {
  SaveCategory,
  DeleteCategory,
  SaveCity,
  SaveLocal,
} from "@/application/usecases"
import { Address, Category, City } from "@/domain/entities"

test("Deve deletar uma categoria com sucesso", async () => {
  const categoryRepository = new CategoryRepositoryMemory()
  const localRepository = new LocalRepositoryMemory()
  const input = {
    name: "Rio de Janeiro",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  const category = (await categoryRepository.findByName(input.name)) as Category
  const deleteCategory = new DeleteCategory(categoryRepository, localRepository)
  await deleteCategory.execute({ id: category.getCategoryId() })
  const getCategories = await categoryRepository.findAll()
  expect(getCategories).toHaveLength(0)
})

test("Deve deletar uma categoria com os locais", async () => {
  const cityRepository = new CityRepositoryMemory()
  const categoryRepository = new CategoryRepositoryMemory()
  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533",
    { lat: 10, long: 10 }
  )
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const input1 = {
    name: "São Paulo",
    images: ["fake-image"],
    description:
      "O São Paulo é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute({ image: "fake-image", name: "Pontos turisticos" })
  await saveCategory.execute({ image: "fake-image", name: "Eventos" })
  const category = (await categoryRepository.findByName(
    "Pontos turisticos"
  )) as Category
  const category1 = (await categoryRepository.findByName("Eventos")) as Category
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  await saveCity.execute(input1)
  const city = (await cityRepository.findByName(input.name)) as City
  const city1 = (await cityRepository.findByName(input1.name)) as City
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: city.getCityId(),
    categoryId: category.getCategoryId(),
  }
  const inputLocal1 = {
    name: "Praia de santos",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: city1.getCityId(),
    categoryId: category1.getCategoryId(),
  }
  const localRepository = new LocalRepositoryMemory()
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveLocal.execute(inputLocal)
  await saveLocal.execute(inputLocal1)
  const deleteCategory = new DeleteCategory(categoryRepository, localRepository)
  await deleteCategory.execute({ id: category.getCategoryId() })
  const getCategories = await categoryRepository.findAll()
  const getLocals = await localRepository.findAll()
  expect(getCategories).toHaveLength(1)
  expect(getLocals).toHaveLength(1)
})

test("Deve tentar deletar uma categoria inexistente", async () => {
  const categoryRepository = new CategoryRepositoryMemory()
  const localRepository = new LocalRepositoryMemory()
  const input = {
    name: "Rio de Janeiro",
    image: "fake-image",
  }
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(input)
  const deleteCategory = new DeleteCategory(categoryRepository, localRepository)
  const getCategories = await categoryRepository.findAll()
  expect(
    async () => await deleteCategory.execute({ id: "fake-id" })
  ).rejects.toThrow(new Error("Category not found"))
  expect(getCategories).toHaveLength(1)
})
