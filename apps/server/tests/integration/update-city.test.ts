import { expect, test } from "vitest"
import { SaveCity, UpdateCity } from "@/application/usecases"
import { City } from "@/domain/entities"
import { MemoryRepository } from "@/infra/factories"

test("Deve editar todos os dados de uma cidade com sucesso", async () => {
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
  const newCityData = {
    name: "São Paulo",
    images: ["fake-image-sp"],
    description:
      "São Paulo é uma cidade deslumbrante com atrações de tirar o fôlego.",
  }
  const updateCity = new UpdateCity(cityRepository)
  await updateCity.execute({ id: city.getCityId(), data: newCityData })
  const updatedCity = await cityRepository.findById(city.getCityId())
  expect(newCityData.name).toEqual(updatedCity.name)
  expect(newCityData.images).toEqual(updatedCity.images)
  expect(newCityData.description).toEqual(updatedCity.description)
})

test("Deve editar apenas um dos dados de uma cidade com sucesso utilizando nome", async () => {
  const repositoryFactory = new MemoryRepository()
  const cityRepository = repositoryFactory.createCityRepository()
  const input = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const input1 = {
    name: "Bahia",
    images: ["fake-image"],
    description:
      "A Bahia é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const saveCity = new SaveCity(cityRepository)
  await saveCity.execute(input)
  await saveCity.execute(input1)
  const city = (await cityRepository.findByName(input.name)) as City
  const newCityData = {
    name: "São Paulo",
  }
  const updateCity = new UpdateCity(cityRepository)
  await updateCity.execute({ id: city.getCityId(), data: newCityData })
  const updatedCity = await cityRepository.findById(city.getCityId())
  expect(newCityData.name).toEqual(updatedCity.name)
})

test("Deve editar apenas um dos dados de uma cidade com sucesso utilizando descrição", async () => {
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
  const newCityData = {
    description:
      "São Paulo é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const updateCity = new UpdateCity(cityRepository)
  await updateCity.execute({ id: city.getCityId(), data: newCityData })
  const updatedCity = await cityRepository.findById(city.getCityId())
  expect(newCityData.description).toEqual(updatedCity.description)
})

test("Deve editar apenas um dos dados de uma cidade com sucesso utilizando imagens", async () => {
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
  const newCityData = {
    images: ["fake-image", "fake-image1"],
  }
  const updateCity = new UpdateCity(cityRepository)
  await updateCity.execute({ id: city.getCityId(), data: newCityData })
  const updatedCity = await cityRepository.findById(city.getCityId())
  expect(newCityData.images).toEqual(updatedCity.images)
})

test("Deve tentar editar os dados de uma cidade com id errado", async () => {
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
  const newCityData = {
    name: "São Paulo",
  }
  const updateCity = new UpdateCity(cityRepository)
  expect(
    async () => await updateCity.execute({ id: "fakeId", data: newCityData })
  ).rejects.toThrow(new Error("City not found"))
})
