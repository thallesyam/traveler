import { beforeEach, expect, test } from "vitest"
import axios from "axios"

beforeEach(async () => {
  await axios.delete("http://localhost:3000/restore")
})

test("Deve testar o cadastro de comentários pela API", async () => {
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
  const responseLocal = await axios.get(
    "http://localhost:3000/local/slug/doce-companhia"
  )
  const { local } = responseLocal.data
  const inputComment = {
    name: "Thalles Ian",
    image: "fake-image",
    text: "Parabéns aos proprietários e funcionários pelo bom atendimento. Lugar aconchegante e com delícias variadas.",
    localId: local.id,
    rating: 3,
  }
  await axios.post("http://localhost:3000/comment", inputComment)
  const responseComments = await axios.get("http://localhost:3000/comments")
  const { comments } = responseComments.data
  expect(comments).toHaveLength(1)
})

test("Deve testar a busca de todos os comentários pela API", async () => {
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
  const responseLocal = await axios.get(
    "http://localhost:3000/local/slug/doce-companhia"
  )
  const { local } = responseLocal.data
  const inputComment = {
    name: "Thalles Ian",
    image: "fake-image",
    text: "Parabéns aos proprietários e funcionários pelo bom atendimento. Lugar aconchegante e com delícias variadas.",
    localId: local.id,
    rating: 3,
  }
  const inputComment1 = {
    name: "Thalles Ian 2",
    image: "fake-image",
    text: "Parabéns aos proprietários e funcionários pelo bom atendimento. Lugar aconchegante e com delícias variadas.",
    localId: local.id,
    rating: 3,
  }
  await axios.post("http://localhost:3000/comment", inputComment)
  await axios.post("http://localhost:3000/comment", inputComment1)
  const responseComments = await axios.get("http://localhost:3000/comments")
  const { comments } = responseComments.data
  const responseLocalAfterComment = await axios.get(
    "http://localhost:3000/local/slug/doce-companhia"
  )
  const { local: localAfterComment } = responseLocalAfterComment.data
  expect(comments).toHaveLength(2)
  expect(localAfterComment.comments).toHaveLength(2)
})

test("Deve testar a busca um comentário por id pela API", async () => {
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
  const responseLocal = await axios.get(
    "http://localhost:3000/local/slug/doce-companhia"
  )
  const { local } = responseLocal.data
  const inputComment = {
    name: "Thalles Ian",
    image: "fake-image",
    text: "Parabéns aos proprietários e funcionários pelo bom atendimento. Lugar aconchegante e com delícias variadas.",
    localId: local.id,
    rating: 3,
  }
  await axios.post("http://localhost:3000/comment", inputComment)
  const responseComments = await axios.get("http://localhost:3000/comments")
  const { comments } = responseComments.data
  const responseCommentById = await axios.get(
    `http://localhost:3000/comment/id/${comments[0].id}`
  )
  const { comment } = responseCommentById.data
  expect(comment.name).toEqual(inputComment.name)
  expect(comment.localId).toEqual(inputComment.localId)
})

test("Deve testar a edição do status de um local pela API", async () => {
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
  const responseLocal = await axios.get(
    "http://localhost:3000/local/slug/doce-companhia"
  )
  const { local } = responseLocal.data
  const inputComment = {
    name: "Thalles Ian 123",
    image: "fake-image",
    text: "Parabéns aos proprietários e funcionários pelo bom atendimento. Lugar aconchegante e com delícias variadas.",
    localId: local.id,
    rating: 3,
  }
  const changedStatus = {
    status: "approved",
  }
  await axios.post("http://localhost:3000/comment", inputComment)
  const responseComments = await axios.get("http://localhost:3000/comments")
  const { comments } = responseComments.data
  await axios.put(
    `http://localhost:3000/comment/change-status/${comments[0].id}`,
    changedStatus
  )
  const responseCommentById = await axios.get(
    `http://localhost:3000/comment/id/${comments[0].id}`
  )
  const { comment } = responseCommentById.data
  expect(comment.status).toBeTruthy()
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
  const responseLocal = await axios.get(
    "http://localhost:3000/local/slug/doce-companhia"
  )
  const { local } = responseLocal.data
  const inputComment = {
    name: "Thalles Ian 123",
    image: "fake-image",
    text: "Parabéns aos proprietários e funcionários pelo bom atendimento. Lugar aconchegante e com delícias variadas.",
    localId: local.id,
    rating: 3,
  }
  await axios.post("http://localhost:3000/comment", inputComment)
  const responseComments = await axios.get("http://localhost:3000/comments")
  const { comments } = responseComments.data
  await axios.delete(`http://localhost:3000/comment/${comments[0].id}`)
  const responseCommentsAfterDelete = await axios.get(
    `http://localhost:3000/comments`
  )
  const { comments: commentsAfterDelete } = responseCommentsAfterDelete.data
  expect(commentsAfterDelete).toHaveLength(0)
})
