import { expect, test } from "vitest"
import { CityRepositoryMemory } from "@/infra/repositories/memory"
import { SaveCity } from "@/application/usecases"
import { GetCities } from "@/application/usecases"

test("Deve buscar todas as cidades com sucesso", async () => {
  const cityRepository = new CityRepositoryMemory()
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
  const cityRepository = new CityRepositoryMemory()
  const getCities = new GetCities(cityRepository)
  const cities = await getCities.execute()
  expect(cities.length).toBe(0)
})
