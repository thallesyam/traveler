import { expect, test } from "vitest"
import { SaveCity, DeleteCity } from "@/application/usecases"
import { City } from "@/domain/entities"
import { MemoryRepository } from "@/infra/factories"

test("Deve deletar uma cidade com sucesso", async () => {
  const repositoryFactory = new MemoryRepository()
  const cityRepository = repositoryFactory.createCityRepository()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const city = (await cityRepository.findByName(input.name)) as City
  const deleteCity = new DeleteCity(cityRepository)
  await deleteCity.execute({ id: city.getCityId() })
  const getCities = await cityRepository.findAll()
  expect(getCities).toHaveLength(0)
})

test("Deve tentar deletar uma cidade inexistente", async () => {
  const repositoryFactory = new MemoryRepository()
  const cityRepository = repositoryFactory.createCityRepository()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const deleteCity = new DeleteCity(cityRepository)
  const getCities = await cityRepository.findAll()
  expect(
    async () => await deleteCity.execute({ id: "fake-id" })
  ).rejects.toThrow(new Error("City not found"))
  expect(getCities).toHaveLength(1)
})
