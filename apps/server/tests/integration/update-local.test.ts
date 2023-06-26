import { expect, test } from "vitest"
import {
  CategoryRepositoryMemory,
  CityRepositoryMemory,
  LocalRepositoryMemory,
} from "@/infra/repositories/memory"
import {
  SaveCategory,
  SaveCity,
  SaveLocal,
  UpdateLocal,
} from "@/application/usecases"
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

test("Deve editar um local com sucesso utilizando os horarios de atendimento", async () => {
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
    openingHours: undefined,
    cityId: city.getCityId(),
    categoryId: category.getCategoryId(),
  }
  const inputLocal1 = {
    name: "Doce e Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: city.getCityId(),
    categoryId: category.getCategoryId(),
  }
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveLocal.execute(inputLocal)
  await saveLocal.execute(inputLocal1)
  const local = await localRepository.findBySlug("doce-companhia")
  const newLocalData = {
    openingHours: mockOpeningHours,
  }
  const updateLocal = new UpdateLocal(
    localRepository,
    cityRepository,
    categoryRepository
  )
  await updateLocal.execute({ id: local.getLocalId(), data: newLocalData })
  const localUpdated = await localRepository.findById(local.getLocalId())
  expect(localUpdated.openingHours).toEqual(mockOpeningHours)
  expect(localUpdated.getLocalId()).toEqual(local.getLocalId())
})

test("Deve editar um local com sucesso utilizando o nome", async () => {
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
    openingHours: undefined,
    cityId: city.getCityId(),
    categoryId: category.getCategoryId(),
  }
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveLocal.execute(inputLocal)
  const local = await localRepository.findBySlug("doce-companhia")
  const newLocalData = {
    name: "Doce e companhia",
  }
  const updateLocal = new UpdateLocal(
    localRepository,
    cityRepository,
    categoryRepository
  )
  await updateLocal.execute({ id: local.getLocalId(), data: newLocalData })
  const localUpdated = await localRepository.findById(local.getLocalId())
  expect(localUpdated.name).toEqual("Doce e companhia")
  expect(localUpdated.slug).toEqual("doce-e-companhia")
  expect(localUpdated.getLocalId()).toEqual(local.getLocalId())
})

test("Deve editar um local com sucesso utilizando o id da categoria", async () => {
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
  await saveCategory.execute({ image: "fake-image", name: "Eventos" })
  const category = (await categoryRepository.findByName(
    "Pontos turisticos"
  )) as Category
  const category1 = (await categoryRepository.findByName("Eventos")) as Category
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const city = (await cityRepository.findByName(input.name)) as City
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
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveLocal.execute(inputLocal)
  const local = await localRepository.findBySlug("doce-companhia")
  const newLocalData = {
    categoryId: category1.getCategoryId(),
  }
  const updateLocal = new UpdateLocal(
    localRepository,
    cityRepository,
    categoryRepository
  )
  await updateLocal.execute({ id: local.getLocalId(), data: newLocalData })
  const localUpdated = await localRepository.findById(local.getLocalId())
  expect(localUpdated.category).toEqual(category1)
  expect(localUpdated.getLocalId()).toEqual(local.getLocalId())
})

test("Deve tentar editar um local com id inválido", async () => {
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
    openingHours: undefined,
    cityId: city.getCityId(),
    categoryId: category.getCategoryId(),
  }
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveLocal.execute(inputLocal)
  const newLocalData = {
    openingHours: mockOpeningHours,
  }
  const updateLocal = new UpdateLocal(
    localRepository,
    cityRepository,
    categoryRepository
  )

  expect(
    async () => await updateLocal.execute({ id: "fake-id", data: newLocalData })
  ).rejects.toThrow(new Error("Local not found"))
})
