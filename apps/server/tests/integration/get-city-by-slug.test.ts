import { expect, test } from "vitest"
import { CityRepositoryMemory } from "@/infra/repositories/memory"
import { SaveCity } from "@/application/usecases"
import { GetCityBySlug } from "@/application/usecases"
import { City } from "@/domain/entities"

test("Deve buscar uma cidade por slug com sucesso", async () => {
  const cityRepository = new CityRepositoryMemory()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const city = (await cityRepository.findByName(input.name)) as City
  const getCityBySlug = new GetCityBySlug(cityRepository)
  const cityBySlug = await getCityBySlug.execute({ slug: city.slug })
  expect(cityBySlug.name).toStrictEqual(input.name)
  expect(cityBySlug.images).toStrictEqual(input.images)
  expect(cityBySlug.description).toStrictEqual(input.description)
})

test("Deve buscar uma cidade com slug inexistente", async () => {
  const cityRepository = new CityRepositoryMemory()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const getCityBySlug = new GetCityBySlug(cityRepository)
  expect(
    async () => await getCityBySlug.execute({ slug: "rio" })
  ).rejects.toThrowError(new Error("City not found"))
})