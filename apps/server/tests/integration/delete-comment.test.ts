import { expect, test } from "vitest"
import {
  CategoryRepositoryMemory,
  CityRepositoryMemory,
  CommentRepositoryMemory,
  LocalRepositoryMemory,
} from "@/infra/repositories/memory"
import {
  GetLocalBySlug,
  SaveCategory,
  SaveCity,
  SaveComment,
  SaveLocal,
  DeleteComment,
} from "@/application/usecases"
import { Address, Category, City } from "@/domain/entities"

test("Deve deletar um comentário com sucesso", async () => {
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
  const deleteComment = new DeleteComment(commentRepository, localRepository)
  await deleteComment.execute({ id: comments[0].getCommentId() })
  const commentsAfterDelete = await commentRepository.findAll()
  expect(commentsAfterDelete).toHaveLength(0)
  const locals = await localRepository.findAll()
  expect(locals[0].getLocalComments()).toHaveLength(0)
})

test("Deve criar dois comentários e deletar corretamente um deles", async () => {
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
  const deleteComment = new DeleteComment(commentRepository, localRepository)
  await deleteComment.execute({ id: comments[0].getCommentId() })
  const commentsAfterDelete = await commentRepository.findAll()
  const locals = await localRepository.findAll()
  expect(commentsAfterDelete).toHaveLength(1)
  expect(locals[0].getLocalComments()).toHaveLength(1)
})

test("Deve tentar deletar um comentário com id inválido", async () => {
  const commentRepository = new CommentRepositoryMemory()
  const localRepository = new LocalRepositoryMemory()
  const deleteComment = new DeleteComment(commentRepository, localRepository)
  expect(
    async () => await deleteComment.execute({ id: "fake-id" })
  ).rejects.toThrow(new Error("Comment not found"))
})
