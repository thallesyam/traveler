import { expect, test } from "vitest"
import {
  RestoreDatabase,
  SaveCategory,
  SaveCity,
  SaveComment,
  SaveLocal,
} from "@/application/usecases"
import { Address, Category, City } from "@/domain/entities"
import { MemoryRepository } from "@/infra/factories"

test("Deve criar um local, uma cidade e uma categoria e depois limpar o banco de dados", async () => {
  const repositoryFactory = new MemoryRepository()
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
    isHightlight: true,
  }
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveLocal.execute(inputLocal)
  const locals = await localRepository.findAll()
  const inputComment = {
    name: "Thalles Ian",
    image: "fake-image",
    text: "Parabéns aos proprietários e funcionários pelo bom atendimento. Lugar aconchegante e com delícias variadas.",
    localId: locals[0].getLocalId(),
    rating: 3,
  }
  const saveComment = new SaveComment(commentRepository, localRepository)
  await saveComment.execute(inputComment)

  await cityRepository.restore()
  await categoryRepository.restore()
  await localRepository.restore()
  await commentRepository.restore()

  const restoreDatabase = new RestoreDatabase(
    cityRepository,
    categoryRepository,
    localRepository,
    commentRepository
  )
  await restoreDatabase.execute()
  const localsAfterRestore = await localRepository.findAll()
  const citiesAfterRestore = await localRepository.findAll()
  const commentsAfterRestore = await localRepository.findAll()
  const categoriesAfterRestore = await localRepository.findAll()

  expect(localsAfterRestore).toHaveLength(0)
  expect(citiesAfterRestore).toHaveLength(0)
  expect(commentsAfterRestore).toHaveLength(0)
  expect(categoriesAfterRestore).toHaveLength(0)
})
