import { beforeEach, expect, test } from "vitest"
import axios from "axios"

beforeEach(async () => {
  await axios.delete("http://localhost:3000/restore")
})

test("Deve testar o cadastro de categoria pela API", async () => {
  const inputCategory = {
    name: "Eventos",
    image: "fake-image",
  }

  await axios.post("http://localhost:3000/category", inputCategory)
  const response = await axios.get("http://localhost:3000/categories")
  const { categories } = response.data
  expect(categories).toHaveLength(1)
})

test("Deve testar a busca de todas as categoria pela API", async () => {
  const inputCategory = {
    name: "Eventos",
    image: "fake-image",
  }

  const inputCategory1 = {
    name: "Pontos Turisticos",
    image: "fake-image",
  }

  await axios.post("http://localhost:3000/category", inputCategory)
  await axios.post("http://localhost:3000/category", inputCategory1)
  const response = await axios.get("http://localhost:3000/categories")
  const { categories } = response.data
  expect(categories).toHaveLength(2)
})

test("Deve testar a busca uma categoria por id pela API", async () => {
  const inputCategory = {
    name: "Eventos 123",
    image: "fake-image",
  }
  await axios.post("http://localhost:3000/category", inputCategory)
  const response = await axios.get("http://localhost:3000/categories")
  const { categories } = response.data
  const responseById = await axios.get(
    `http://localhost:3000/category/id/${categories[0].id}`
  )
  const { category } = responseById.data

  expect(category.name).toEqual(inputCategory.name)
})

test("Deve testar a busca uma categoria por id da cidade pela API", async () => {
  const inputCategory = {
    name: "Eventos 123",
    image: "fake-image",
  }
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  await axios.post("http://localhost:3000/city", inputCity)
  await axios.post("http://localhost:3000/category", inputCategory)
  const response = await axios.get("http://localhost:3000/cities")
  const { cities } = response.data

  const responseById = await axios.get(
    `http://localhost:3000/category/byCityId/${cities[0].id}`
  )

  const { categories } = responseById.data
  expect(categories).toHaveLength(0)
})

test("Deve testar a edição de categoria pela API", async () => {
  const inputCategory = {
    name: "Eventos",
    image: "fake-image",
  }
  const inputCategoryUpdate = {
    image: "fake-image-updated",
  }

  await axios.post("http://localhost:3000/category", inputCategory)
  const response = await axios.get("http://localhost:3000/categories")
  const { categories } = response.data

  await axios.put(
    `http://localhost:3000/category/${categories[0].id}`,
    inputCategoryUpdate
  )
  const responseAfterUpdate = await axios.get(
    "http://localhost:3000/categories"
  )

  const { categories: categoriesAfterUpdate } = responseAfterUpdate.data

  expect(categoriesAfterUpdate[0].image).toEqual(inputCategoryUpdate.image)
})

test("Deve testar a remoção de uma categoria pela API", async () => {
  const inputCategory = {
    name: "Eventos",
    image: "fake-image",
  }
  await axios.post("http://localhost:3000/category", inputCategory)
  const response = await axios.get("http://localhost:3000/categories")
  const { categories } = response.data
  await axios.delete(`http://localhost:3000/category/${categories[0].id}`)
  const responseAfterDelete = await axios.get(
    "http://localhost:3000/categories"
  )
  const { categories: categoriesAfterDelete } = responseAfterDelete.data
  expect(categoriesAfterDelete).toHaveLength(0)
})
