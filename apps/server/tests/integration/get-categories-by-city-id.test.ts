import { expect, test } from "vitest"
import {
  CategoryRepositoryMemory,
  CityRepositoryMemory,
  LocalRepositoryMemory,
} from "@/infra/repositories/memory"
import {
  GetCategoryByCityId,
  GetCityBySlug,
  SaveCategory,
  SaveCity,
  SaveLocal,
} from "@/application/usecases"
import { Address, Category, City } from "@/domain/entities"

test("Deve retornar a quantidade de locais que existe na categoria de uma cidade", async () => {
  const cityRepository = new CityRepositoryMemory()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const input1 = {
    name: "São Paulo",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  await saveCity.execute(input1)
  const categoryRepository = new CategoryRepositoryMemory()
  const categoryInput = {
    name: "Pontos turisticos",
    image: "fake-image",
  }
  const categoryInput1 = {
    name: "Eventos",
    image: "fake-image",
  }
  const getCityBySlug = new GetCityBySlug(cityRepository)
  const cityBySlug = await getCityBySlug.execute({ slug: "rio-de-janeiro" })
  const saveCategory = new SaveCategory(categoryRepository)
  await saveCategory.execute(categoryInput)
  await saveCategory.execute(categoryInput1)
  const category = (await categoryRepository.findByName(
    "Pontos turisticos"
  )) as Category
  const category1 = (await categoryRepository.findByName("Eventos")) as Category
  const city = (await cityRepository.findByName(input.name)) as City
  const city1 = (await cityRepository.findByName(input1.name)) as City
  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533",
    { lat: 10, long: 10 }
  )
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
    cityId: city1.getCityId(),
    categoryId: category.getCategoryId(),
  }
  const inputLocal2 = {
    name: "Doce ee Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: city.getCityId(),
    categoryId: category1.getCategoryId(),
  }
  const localRepository = new LocalRepositoryMemory()
  const saveLocal = new SaveLocal(
    cityRepository,
    categoryRepository,
    localRepository
  )
  await saveLocal.execute(inputLocal)
  await saveLocal.execute(inputLocal1)
  await saveLocal.execute(inputLocal2)

  const getCategoryByCityId = new GetCategoryByCityId(categoryRepository)
  const count = await getCategoryByCityId.execute({
    cityId: cityBySlug.getCityId(),
  })

  expect(count).toEqual(
    expect.arrayContaining([
      { name: category.name, quantity: 1 },
      { name: category1.name, quantity: 1 },
    ])
  )
})
