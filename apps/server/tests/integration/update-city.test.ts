import { expect, test } from "vitest"
import { CityRepositoryMemory } from "@/infra/repositories/memory"
import { SaveCity, UpdateCity } from "@/application/usecases"

test("Deve editar todos os dados de uma cidade com sucesso", async () => {
  const cityRepository = new CityRepositoryMemory()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const city = await cityRepository.findByName(input.name)
  const newCityData = {
    name: "São Paulo",
    images: ["fake-image-sp"],
    description:
      "São Paulo é uma cidade deslumbrante com atrações de tirar o fôlego.",
  }
  const updateCity = new UpdateCity(cityRepository)
  await updateCity.execute({ id: city?.id ?? "", data: newCityData })
  const updatedCity = await cityRepository.findById(city?.id ?? "")
  expect(newCityData.name).toEqual(updatedCity?.name)
  expect(newCityData.images).toEqual(updatedCity?.images)
  expect(newCityData.description).toEqual(updatedCity?.description)
})

test("Deve editar apenas um dos dados de uma cidade com sucesso", async () => {
  const cityRepository = new CityRepositoryMemory()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const city = await cityRepository.findByName(input.name)
  const newCityData = {
    name: "São Paulo",
  }
  const updateCity = new UpdateCity(cityRepository)
  await updateCity.execute({ id: city?.id ?? "", data: newCityData })
  const updatedCity = await cityRepository.findById(city?.id ?? "")
  expect(newCityData.name).toEqual(updatedCity?.name)
})

test("Deve tentar editar os dados de uma cidade com id errado", async () => {
  const cityRepository = new CityRepositoryMemory()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  const newCityData = {
    name: "São Paulo",
  }
  const updateCity = new UpdateCity(cityRepository)
  expect(
    async () => await updateCity.execute({ id: "fakeId", data: newCityData })
  ).rejects.toThrow(new Error("City not found"))
})
