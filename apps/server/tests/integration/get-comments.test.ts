import { beforeAll, beforeEach, expect, test } from "vitest"
import { PrismaClient } from "@prisma/client"
import {
  GetComments,
  GetLocalBySlug,
  SaveCategory,
  SaveCity,
  SaveComment,
  SaveLocal,
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

test("Deve buscar todos os comentário com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const cityRepository = repositoryFactory.createCityRepository()
  const categoryRepository = repositoryFactory.createCategoryRepository()
  const localRepository = repositoryFactory.createLocalRepository()
  const commentRepository = repositoryFactory.createCommentRepository()
  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533",
    { lat: 10, long: 10 }
  )
  const inputCity = {
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
  await saveCity.execute(inputCity)
  const city = (await cityRepository.findByName(inputCity.name)) as City
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
  const getLocalBySlug = new GetLocalBySlug(localRepository)
  const local = await getLocalBySlug.execute({ slug: "doce-companhia" })
  const inputComment = {
    name: "Thalles Ian",
    image: "fake-image",
    text: "Parabéns aos proprietários e funcionários pelo bom atendimento. Lugar aconchegante e com delícias variadas.",
    localId: local.getLocalId(),
    rating: 3,
  }
  const saveComment = new SaveComment(commentRepository, localRepository)
  await saveComment.execute(inputComment)
  const getComments = new GetComments(commentRepository)
  const comments = await getComments.execute()
  expect(comments).toHaveLength(1)
})

test("Deve buscar os comentários e retornar uma lista vazia", async () => {
  const repositoryFactory = new MemoryRepository()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const commentRepository = repositoryFactory.createCommentRepository()
  const getComments = new GetComments(commentRepository)
  const comments = await getComments.execute()
  expect(comments).toHaveLength(0)
})
