import { beforeAll, beforeEach, expect, test } from "vitest"
import { PrismaClient } from "@prisma/client"
import {
  SaveCity,
  SaveLocal,
  DeleteLocal,
  SaveCategory,
} from "@/application/usecases"
import { Address, Category, City } from "@/domain/entities"
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

test("Deve deletar um local com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
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
  const deleteLocal = new DeleteLocal(cityRepository, localRepository)
  await deleteLocal.execute({ id: local.getLocalId() })
  const locals = await localRepository.findAll()
  const localByCity = await cityRepository.findById(city.getCityId())
  expect(locals).toHaveLength(1)
  expect(localByCity.getLocals()).toHaveLength(1)
})

test("Deve tentar deletar um local com id inválido", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
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
  const deleteLocal = new DeleteLocal(cityRepository, localRepository)
  expect(
    async () => await deleteLocal.execute({ id: "fake-id" })
  ).rejects.toThrow(new Error("Local not found"))
})
