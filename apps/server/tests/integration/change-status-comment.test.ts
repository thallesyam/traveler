import { beforeAll, beforeEach, expect, test } from "vitest"
import { PrismaClient } from "@prisma/client"
import {
  GetLocalBySlug,
  SaveCategory,
  SaveCity,
  SaveComment,
  SaveLocal,
  ApproveComment,
} from "@/application/usecases"
import { Address, Category, City } from "@/domain/entities"
import { DatabaseRepository, MemoryRepository } from "@/infra/factories"
import { getEnv } from "@/utils/get-env"


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

test("Deve aprovar um comentário com sucesso", async () => {
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
  const comments = await commentRepository.findAll()
  const approveComment = new ApproveComment(commentRepository, localRepository)
  await approveComment.execute({
    id: comments[0].getCommentId(),
    status: "approved",
  })
  const comment = await commentRepository.findById(comments[0].getCommentId())
  expect(comment.getStatus()).toBe(true)
})

test("Deve aprovar um comentário com sucesso e reprovar outro", async () => {
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
    rating: 3.3,
  }
  const inputComment1 = {
    name: "Thalles Ian",
    image: "fake-image",
    text: "Parabéns aos proprietários e funcionários pelo bom atendimento. Lugar aconchegante e com delícias variadas.",
    localId: local.getLocalId(),
    rating: 4.6,
  }
  const saveComment = new SaveComment(commentRepository, localRepository)
  await saveComment.execute(inputComment)
  await saveComment.execute(inputComment1)
  const comments = await commentRepository.findAll()
  const approveComment = new ApproveComment(commentRepository, localRepository)
  await approveComment.execute({
    id: comments[0].getCommentId(),
    status: "approved",
  })
  await approveComment.execute({
    id: comments[1].getCommentId(),
    status: "reproved",
  })
  const comment = await commentRepository.findById(comments[0].getCommentId())
  const comment1 = await commentRepository.findById(comments[1].getCommentId())
  expect(comment.getStatus()).toBe(true)
  expect(comment1.getStatus()).toBe(false)
})

test("Deve tentar aprovar um comentário com id inválido", async () => {
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
    rating: 3.3,
  }

  const saveComment = new SaveComment(commentRepository, localRepository)
  await saveComment.execute(inputComment)
  const approveComment = new ApproveComment(commentRepository, localRepository)
  expect(
    async () =>
      await approveComment.execute({
        id: "fake-id",
        status: "approved",
      })
  ).rejects.toThrow(new Error("Comment not found"))
})
