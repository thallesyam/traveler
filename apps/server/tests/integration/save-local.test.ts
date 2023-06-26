import { expect, test } from "vitest"
import { SaveCategory, SaveCity, SaveLocal } from "@/application/usecases"
import { Address, Category, City } from "@/domain/entities"
import { MemoryRepository } from "@/infra/factories"

const mockOpeningHours = [
  {
    weekDay: 0,
    open: null,
    close: null,
  },
  {
    weekDay: 1,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
  {
    weekDay: 2,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
  {
    weekDay: 3,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
  {
    weekDay: 4,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
  {
    weekDay: 5,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
  {
    weekDay: 6,
    open: new Date().setHours(8, 0, 0, 0) / 1000,
    close: new Date().setHours(18, 0, 0, 0) / 1000,
  },
]

test("Deve criar um local com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
  const cityRepository = repositoryFactory.createCityRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const localRepository = repositoryFactory.createLocalRepository()
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
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute({ image: "fake-image", name: "Pontos turisticos" })
  const category = (await categoryRepository.findByName(
    "Pontos turisticos"
  )) as Category
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const city = (await cityRepository.findByName(input.name)) as City
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: mockOpeningHours,
    cityId: city.getCityId(),
    categoryId: category.getCategoryId(),
  }
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveLocal.execute(inputLocal)
  const cityAfterUpdate = (await cityRepository.findByName(input.name)) as City
  const locals = await localRepository.findAll()
  expect(locals).toHaveLength(1)
  expect(cityAfterUpdate.getLocals()).toHaveLength(1)
  expect(locals[0].name).toEqual(inputLocal.name)
  expect(locals[0].address).toEqual(address)
  expect(locals[0].description).toEqual(inputLocal.description)
  expect(locals[0].openingHours).toEqual(inputLocal.openingHours)
  expect(locals[0].images).toEqual(inputLocal.images)
  expect(locals[0].getIsHightlight()).toEqual(false)
})

test("Deve criar um local de destaque com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
  const cityRepository = repositoryFactory.createCityRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const localRepository = repositoryFactory.createLocalRepository()
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
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute({ image: "fake-image", name: "Pontos turisticos" })
  const category = (await categoryRepository.findByName(
    "Pontos turisticos"
  )) as Category
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const city = (await cityRepository.findByName(input.name)) as City
  const inputLocal1 = {
    name: "Doce e Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: mockOpeningHours,
    cityId: city.getCityId(),
    categoryId: category.getCategoryId(),
    isHightlight: true,
  }
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveLocal.execute(inputLocal1)
  const locals = await localRepository.findAll()
  const cityAfterUpdate = (await cityRepository.findByName(input.name)) as City
  expect(locals).toHaveLength(1)
  expect(cityAfterUpdate.getLocals()).toHaveLength(1)
  expect(locals[0].name).toEqual(inputLocal1.name)
  expect(locals[0].address).toEqual(address)
  expect(locals[0].description).toEqual(inputLocal1.description)
  expect(locals[0].openingHours).toEqual(inputLocal1.openingHours)
  expect(locals[0].images).toEqual(inputLocal1.images)
  expect(locals[0].getIsHightlight()).toEqual(true)
})

test("Deve tentar criar um local inválido", async () => {
  const repositoryFactory = new MemoryRepository()
  const cityRepository = repositoryFactory.createCityRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const localRepository = repositoryFactory.createLocalRepository()
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
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute({ image: "fake-image", name: "Pontos turisticos" })
  const category = (await categoryRepository.findByName(
    "Pontos turisticos"
  )) as Category
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const city = (await cityRepository.findByName(input.name)) as City
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: mockOpeningHours,
    cityId: city.getCityId(),
    categoryId: category.getCategoryId(),
  }
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveLocal.execute(inputLocal)
  expect(async () => await saveLocal.execute(inputLocal)).rejects.toThrow(
    new Error("Local with same name already register")
  )
})
