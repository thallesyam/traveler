import { beforeAll, beforeEach, expect, test } from "vitest"
import { PrismaClient } from "@prisma/client"
import { SaveCity, GetCities } from "@/application/usecases"
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

test("Deve buscar todas as cidades com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const cityRepository = repositoryFactory.createCityRepository()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const getCities = new GetCities(cityRepository)
  const cities = await getCities.execute()
  expect(cities.length).toBe(1)
})

test("Deve buscar uma cidade e não encontrar nenhuma", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const cityRepository = repositoryFactory.createCityRepository()
  const getCities = new GetCities(cityRepository)
  const cities = await getCities.execute()
  expect(cities.length).toBe(0)
})
