import { beforeAll, beforeEach, expect, test } from "vitest"
import { PrismaClient } from "@prisma/client"
import {
  GetLocalById,
  SaveCategory,
  SaveCity,
  SaveLocal,
} from "@/application/usecases"
import { Address } from "@/domain/entities"
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

test("Deve buscar um local por id", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const cityRepository = repositoryFactory.createCityRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const localRepository = repositoryFactory.createLocalRepository()
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const inputCategory = {
    name: "Rio de Janeiro",
    image: "fake-image",
  }

  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533",
    { lat: 10, long: 10 }
  )

  const openingHours = [
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
  const saveCity = new SaveCity(cityRepository)
  const saveCategory = new SaveCategory(categoryRepository)
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveCity.execute(inputCity)
  await saveCategory.execute(inputCategory)
  const cities = await cityRepository.findAll()
  const categories = await categoryRepository.findAll()
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours,
    cityId: cities[0].getCityId(),
    categoryId: categories[0].getCategoryId(),
    isHightlight: true,
  }
  await saveLocal.execute(inputLocal)
  const locals = await localRepository.findAll()
  const getLocalById = new GetLocalById(localRepository)
  const local = await getLocalById.execute({ id: locals[0].getLocalId() })
  expect(local.name).toEqual("Doce & Companhia")
  expect(local.description).toEqual(
    "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros."
  )
  expect(local.images).toEqual(["fake-image"])
  expect(local.address).toStrictEqual(address)
  expect(local.cityId).toStrictEqual(cities[0].getCityId())
  expect(local.category).toEqual(categories[0])
})

test("Deve tentar buscar um local com id inválido", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const localRepository = repositoryFactory.createLocalRepository()
  const getLocalById = new GetLocalById(localRepository)
  expect(async () => await getLocalById.execute({ id: "" })).rejects.toThrow(
    new Error("Local not found")
  )
})
