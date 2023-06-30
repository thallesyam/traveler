import { beforeEach, expect, test } from "vitest"
import axios from "axios"

beforeEach(async () => {
  await axios.delete("http://localhost:3000/restore")
})

test("Deve testar o cadastro de local pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const inputCategory = {
    name: "Eventos 123",
    image: "fake-image",
  }
  await axios.post("http://localhost:3000/city", inputCity)
  await axios.post("http://localhost:3000/category", inputCategory)
  const responseCity = await axios.get("http://localhost:3000/cities")
  const { cities } = responseCity.data
  const responseCategories = await axios.get("http://localhost:3000/categories")
  const { categories } = responseCategories.data
  const address = {
    cep: "08225260",
    street: "Rua Francisco da cunha",
    neighborhood: "Jardim Itapemirim",
    number: "533",
    coordinate: { lat: 10, long: 10 },
  }
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: cities[0].id,
    categoryId: categories[0].id,
    isHightlight: true,
  }
  await axios.post("http://localhost:3000/local", inputLocal)
  const responseLocals = await axios.get("http://localhost:3000/locals")
  const { locals } = responseLocals.data
  expect(locals).toHaveLength(1)
})

test("Deve testar a busca de todos os locais pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const inputCategory = {
    name: "Eventos 123",
    image: "fake-image",
  }
  await axios.post("http://localhost:3000/city", inputCity)
  await axios.post("http://localhost:3000/category", inputCategory)
  const responseCity = await axios.get("http://localhost:3000/cities")
  const { cities } = responseCity.data
  const responseCategories = await axios.get("http://localhost:3000/categories")
  const { categories } = responseCategories.data
  const address = {
    cep: "08225260",
    street: "Rua Francisco da cunha",
    neighborhood: "Jardim Itapemirim",
    number: "533",
    coordinate: { lat: 10, long: 10 },
  }
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: cities[0].id,
    categoryId: categories[0].id,
    isHightlight: true,
  }
  const inputLocal1 = {
    name: "Bar da cidade",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: cities[0].id,
    categoryId: categories[0].id,
    isHightlight: true,
  }
  await axios.post("http://localhost:3000/local", inputLocal)
  await axios.post("http://localhost:3000/local", inputLocal1)
  const responseLocals = await axios.get("http://localhost:3000/locals")
  const { locals } = responseLocals.data
  expect(locals).toHaveLength(2)
})

test("Deve testar a busca um local por id pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const inputCategory = {
    name: "Eventos 123",
    image: "fake-image",
  }
  await axios.post("http://localhost:3000/city", inputCity)
  await axios.post("http://localhost:3000/category", inputCategory)
  const responseCity = await axios.get("http://localhost:3000/cities")
  const { cities } = responseCity.data
  const responseCategories = await axios.get("http://localhost:3000/categories")
  const { categories } = responseCategories.data
  const address = {
    cep: "08225260",
    street: "Rua Francisco da cunha",
    neighborhood: "Jardim Itapemirim",
    number: "533",
    coordinate: { lat: 10, long: 10 },
  }
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: cities[0].id,
    categoryId: categories[0].id,
    isHightlight: true,
  }
  await axios.post("http://localhost:3000/local", inputLocal)
  const responseLocals = await axios.get("http://localhost:3000/locals")
  const { locals } = responseLocals.data
  const responseLocalById = await axios.get(
    `http://localhost:3000/local/id/${locals[0].id}`
  )
  const responseCityAfterAddLocal = await axios.get(
    "http://localhost:3000/cities"
  )
  const { cities: citiesAfterLocal } = responseCityAfterAddLocal.data
  const responseCategoriesAfterAddLocal = await axios.get(
    "http://localhost:3000/categories"
  )
  const { categories: categoriesAfterLocal } =
    responseCategoriesAfterAddLocal.data
  const { local } = responseLocalById.data
  expect(local.name).toEqual(inputLocal.name)
  expect(local.cityId).toEqual(inputLocal.cityId)
  expect(citiesAfterLocal[0].locals).toHaveLength(1)
  expect(categoriesAfterLocal[0].locals).toHaveLength(1)
})

test("Deve testar a busca um local por slug pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const inputCategory = {
    name: "Eventos 123",
    image: "fake-image",
  }
  await axios.post("http://localhost:3000/city", inputCity)
  await axios.post("http://localhost:3000/category", inputCategory)
  const responseCity = await axios.get("http://localhost:3000/cities")
  const { cities } = responseCity.data
  const responseCategories = await axios.get("http://localhost:3000/categories")
  const { categories } = responseCategories.data
  const address = {
    cep: "08225260",
    street: "Rua Francisco da cunha",
    neighborhood: "Jardim Itapemirim",
    number: "533",
    coordinate: { lat: 10, long: 10 },
  }
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: cities[0].id,
    categoryId: categories[0].id,
    isHightlight: true,
  }
  await axios.post("http://localhost:3000/local", inputLocal)
  const responseLocalBySlug = await axios.get(
    `http://localhost:3000/local/slug/doce-companhia`
  )
  const { local } = responseLocalBySlug.data
  expect(local.name).toEqual(inputLocal.name)
})

test("Deve testar a edição de local pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const inputCategory = {
    name: "Eventos 123",
    image: "fake-image",
  }
  await axios.post("http://localhost:3000/city", inputCity)
  await axios.post("http://localhost:3000/category", inputCategory)
  const responseCity = await axios.get("http://localhost:3000/cities")
  const { cities } = responseCity.data
  const responseCategories = await axios.get("http://localhost:3000/categories")
  const { categories } = responseCategories.data
  const address = {
    cep: "08225260",
    street: "Rua Francisco da cunha",
    neighborhood: "Jardim Itapemirim",
    number: "533",
    coordinate: { lat: 10, long: 10 },
  }
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: cities[0].id,
    categoryId: categories[0].id,
    isHightlight: true,
  }
  const localUpdated = {
    name: "Doce e Companhia",
  }
  await axios.post("http://localhost:3000/local", inputLocal)
  const responseLocalBySlug = await axios.get(
    `http://localhost:3000/local/slug/doce-companhia`
  )
  const { local } = responseLocalBySlug.data
  await axios.put(`http://localhost:3000/local/${local.id}`, localUpdated)
  const responseLocalBySlugAfterUpdate = await axios.get(
    `http://localhost:3000/local/slug/doce-e-companhia`
  )
  const { local: localAfterUpdate } = responseLocalBySlugAfterUpdate.data
  expect(localAfterUpdate.name).toEqual(localUpdated.name)
})

test("Deve testar a remoção de local pela API", async () => {
  const inputCity = {
    name: "Rio de Janeiro",
    images: ["fake-image"],
    description:
      "O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego.",
  }
  const inputCategory = {
    name: "Eventos 123",
    image: "fake-image",
  }
  await axios.post("http://localhost:3000/city", inputCity)
  await axios.post("http://localhost:3000/category", inputCategory)
  const responseCity = await axios.get("http://localhost:3000/cities")
  const { cities } = responseCity.data
  const responseCategories = await axios.get("http://localhost:3000/categories")
  const { categories } = responseCategories.data
  const address = {
    cep: "08225260",
    street: "Rua Francisco da cunha",
    neighborhood: "Jardim Itapemirim",
    number: "533",
    coordinate: { lat: 10, long: 10 },
  }
  const inputLocal = {
    name: "Doce & Companhia",
    description:
      "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    images: ["fake-image"],
    address,
    openingHours: undefined,
    cityId: cities[0].id,
    categoryId: categories[0].id,
    isHightlight: true,
  }
  await axios.post("http://localhost:3000/local", inputLocal)
  const responseLocalBySlug = await axios.get(
    `http://localhost:3000/local/slug/doce-companhia`
  )
  const { local } = responseLocalBySlug.data
  await axios.delete(`http://localhost:3000/local/${local.id}`)
  const responseLocals = await axios.get(`http://localhost:3000/locals`)
  const { locals } = responseLocals.data
  expect(locals).toHaveLength(0)
})
