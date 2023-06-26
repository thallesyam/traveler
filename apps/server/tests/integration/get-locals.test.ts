import { expect, test } from "vitest"
import {
  GetLocals,
  SaveCategory,
  SaveCity,
  SaveLocal,
} from "@/application/usecases"
import { Address } from "@/domain/entities"
import { MemoryRepository } from "@/infra/factories"

test("Deve buscar por todos os locais", async () => {
  const repositoryFactory = new MemoryRepository()
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
    name: "Doce e Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: cities[0].getCityId(),
    categoryId: categories[0].getCategoryId(),
    isHightlight: true,
  }
  await saveLocal.execute(inputLocal)
  const getLocals = new GetLocals(localRepository)
  const locals = await getLocals.execute()
  expect(locals).toHaveLength(1)
})

test("Deve buscar por todos os locais e não retornar nenhum dado", async () => {
  const repositoryFactory = new MemoryRepository()
  const localRepository = repositoryFactory.createLocalRepository()
  const getLocals = new GetLocals(localRepository)
  const locals = await getLocals.execute()
  expect(locals).toHaveLength(0)
})
