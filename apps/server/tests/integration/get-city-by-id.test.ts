import { beforeAll, beforeEach, expect, test } from "vitest"
import { PrismaClient } from "@prisma/client"
import { SaveCity, GetCityById } from "@/application/usecases"
import { City } from "@/domain/entities"
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

test("Deve buscar uma cidade por id com sucesso", async () => {
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
  const city = (await cityRepository.findByName(input.name)) as City
  const getCityById = new GetCityById(cityRepository)
  const cityById = await getCityById.execute({ id: city.getCityId() })
  expect(cityById.name).toStrictEqual(input.name)
  expect(cityById.images).toStrictEqual(input.images)
  expect(cityById.description).toStrictEqual(input.description)
})

test("Deve buscar uma cidade com id inexistente", async () => {
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
  const getCityById = new GetCityById(cityRepository)
  expect(
    async () => await getCityById.execute({ id: "1" })
  ).rejects.toThrowError(new Error("City not found"))
})
