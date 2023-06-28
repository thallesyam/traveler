import { beforeEach, expect, test } from "vitest"
import axios from "axios"

beforeEach(async () => {
  await axios.delete("http://localhost:3000/restore")
})

test("Deve testar o cadastro de cidade pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }

  await axios.post("http://localhost:3000/city", inputCity)
  const response = await axios.get("http://localhost:3000/cities")
  const { cities } = response.data
  expect(cities).toHaveLength(1)
})

test("Deve testar a busca de todas as cidades pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro 1",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const inputCity1 = {
    name: "São Paulo",
    images: ["fake-image"],
    description:
      "O São Paulo é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }

  await axios.post("http://localhost:3000/city", inputCity)
  await axios.post("http://localhost:3000/city", inputCity1)
  const response = await axios.get("http://localhost:3000/cities")
  const { cities } = response.data
  expect(cities).toHaveLength(2)
})

test("Deve testar a busca uma cidade por id pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  await axios.post("http://localhost:3000/city", inputCity)
  const response = await axios.get("http://localhost:3000/cities")
  const { cities } = response.data

  const responseById = await axios.get(
    `http://localhost:3000/city/id/${cities[0].id}`
  )
  const { city } = responseById.data

  expect(city.name).toEqual(inputCity.name)
})

test("Deve testar a busca uma cidade por slug pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  await axios.post("http://localhost:3000/city", inputCity)
  const responseBySlug = await axios.get(
    `http://localhost:3000/city/slug/rio-de-janeiro`
  )
  const { city } = responseBySlug.data

  expect(city.name).toEqual(inputCity.name)
})

test("Deve testar a edição de cidade pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const inputCityUpdate = {
    images: ["fake-image", "fake-image-updated"],
  }

  await axios.post("http://localhost:3000/city", inputCity)
  const response = await axios.get("http://localhost:3000/cities")
  const { cities } = response.data
  await axios.put(`http://localhost:3000/city/${cities[0].id}`, inputCityUpdate)
  const responseAfterUpdate = await axios.get(
    `http://localhost:3000/city/slug/rio-de-janeiro`
  )
  const { city } = responseAfterUpdate.data

  expect(city.images).toEqual(inputCityUpdate.images)
})

test("Deve testar a remoção de uma cidade pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const inputCityUpdate = {
    images: ["fake-image", "fake-image-updated"],
  }

  await axios.post("http://localhost:3000/city", inputCity)
  const response = await axios.get("http://localhost:3000/cities")
  const { cities } = response.data
  await axios.delete(`http://localhost:3000/city/${cities[0].id}`)
  const responseAfterDelete = await axios.get("http://localhost:3000/cities")
  const { cities: citiesAfterDelete } = responseAfterDelete.data
  expect(citiesAfterDelete).toHaveLength(0)
})
