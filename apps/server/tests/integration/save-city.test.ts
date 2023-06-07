import { expect, test } from "vitest"
import { CityRepositoryMemory } from "@/infra/repositories/memory"
import { SaveCity } from "@/application/usecases"

test("Deve criar uma cidade com sucesso", async () => {
  const cityRepository = new CityRepositoryMemory()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const cities = await cityRepository.findAll()
  expect(cities).toHaveLength(1)
})

test("Deve tentar criar uma cidade com nome repetido", async () => {
  const cityRepository = new CityRepositoryMemory()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  expect(async () => await saveCity.execute(input)).rejects.toThrowError(
    new Error("A city with that name already exists")
  )
})
