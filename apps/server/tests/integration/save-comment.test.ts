import { beforeAll, beforeEach, expect, test } from "vitest"
import {
  CategoryRepositoryMemory,
  CityRepositoryMemory,
  CommentRepositoryMemory,
  LocalRepositoryMemory,
} from "@/infra/repositories/memory"
import {
  ApproveComment,
  GetLocalBySlug,
  SaveCategory,
  SaveCity,
  SaveComment,
  SaveLocal,
} from "@/application/usecases"
import { Address, Category, City } from "@/domain/entities"
import {
  CategoryRepositoryDatabase,
  CityRepositoryDatabase,
  CommentRepositoryDatabase,
  LocalRepositoryDatabase,
} from "@/infra/repositories/database/prisma"

test("Deve criar um comentário com sucesso", async () => {
  const commentRepository = new CommentRepositoryMemory()
  const cityRepository = new CityRepositoryMemory()
  const categoryRepository = new CategoryRepositoryMemory()
  const localRepository = new LocalRepositoryMemory()
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
  const commentsAfterApprove = await commentRepository.findAll()
  const localAfterAddComment = await getLocalBySlug.execute({
    slug: "doce-companhia",
  })
  expect(comments[0].name).toBe(inputComment.name)
  expect(comments[0].image).toBe(inputComment.image)
  expect(comments[0].text).toBe(inputComment.text)
  expect(comments[0].rating).toBe(inputComment.rating)
  expect(comments[0].localId).toBe(inputComment.localId)
  expect(localAfterAddComment.getLocalComments()).toEqual(commentsAfterApprove)
  expect(localAfterAddComment.getRating()).toStrictEqual(3)
})

test("Deve criar dois comentários com sucesso e calcular corretamente a pontuação de avaliação", async () => {
  const commentRepository = new CommentRepositoryMemory()
  const cityRepository = new CityRepositoryMemory()
  const categoryRepository = new CategoryRepositoryMemory()
  const localRepository = new LocalRepositoryMemory()
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
    status: "approved",
  })
  const localAfterOperations = await getLocalBySlug.execute({
    slug: "doce-companhia",
  })

  expect(localAfterOperations.getRating()).toStrictEqual(3.9)
})

test("Deve tentar criar um comentário com localId inválido", async () => {
  const commentRepository = new CommentRepositoryMemory()
  const cityRepository = new CityRepositoryMemory()
  const categoryRepository = new CategoryRepositoryMemory()
  const localRepository = new LocalRepositoryMemory()
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute({ image: "fake-image", name: "Pontos turisticos" })
  const inputComment = {
    name: "Thalles Ian",
    image: "fake-image",
    text: "Parabéns aos proprietários e funcionários pelo bom atendimento. Lugar aconchegante e com delícias variadas.",
    localId: "fake-id",
    rating: 3,
  }
  const saveComment = new SaveComment(commentRepository, localRepository)
  expect(async () => await saveComment.execute(inputComment)).rejects.toThrow(
    new Error("Local not found")
  )
})
