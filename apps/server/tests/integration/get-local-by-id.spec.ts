import { expect, test } from "vitest"
import { Address, City, Local } from "@/domain/entities"
import { LocalRepositoryMemory } from "@/infra/repositories/memory"
import { GetLocalById } from "@/application/usecases/get-local-by-id"

const mockCity = {
  name: "Rio de Janeiro",
  images: [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/8c/14/06/ipanema.jpg?w=600&h=400&s=1",
  ],
  description: `O Rio de Janeiro é uma cidade deslumbrante com paisagens de tirar o fôlego. Suas praias icônicas, como Copacabana e Ipanema, 
  encantam visitantes de todo o mundo. Além disso, o Cristo Redentor, no topo do Corcovado, oferece uma vista panorâmica incrível. 
  Com uma mistura vibrante de cultura, gastronomia e vida noturna, o Rio de Janeiro é um destino único 
  que cativa os sentidos e deixa memórias inesquecíveis.`,
}

test("Deve buscar um local por id", async () => {
  const city = new City(mockCity.name, mockCity.images, mockCity.description)
  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533",
    { lat: 10, long: 10 }
  )

  const openingHours = [
    {
      weekDay: 0,
      open: null,
      close: null,
    },
    {
      weekDay: 1,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
    {
      weekDay: 2,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
    {
      weekDay: 3,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
    {
      weekDay: 4,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
    {
      weekDay: 5,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
    {
      weekDay: 6,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
  ]

  const input = new Local(
    "Doce & Companhia",
    "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    ["fake-image"],
    address,
    openingHours,
    city,
    "fake-category-id",
    undefined
  )
  const localRepository = new LocalRepositoryMemory()
  await localRepository.save(input)
  const getLocalById = new GetLocalById(localRepository)
  const local = await getLocalById.execute({ id: input.getLocalId() })
  expect(local.name).toEqual("Doce & Companhia")
  expect(local.description).toEqual(
    "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros."
  )
  expect(local.images).toEqual(["fake-image"])
  expect(local.address).toStrictEqual(address)
  expect(local.city).toStrictEqual(city)
  expect(local.categoryId).toEqual("fake-category-id")
})

test("Deve tentar buscar um local com id inválido", async () => {
  const city = new City(mockCity.name, mockCity.images, mockCity.description)
  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533",
    { lat: 10, long: 10 }
  )

  const openingHours = [
    {
      weekDay: 0,
      open: null,
      close: null,
    },
    {
      weekDay: 1,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
    {
      weekDay: 2,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
    {
      weekDay: 3,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
    {
      weekDay: 4,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
    {
      weekDay: 5,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
    {
      weekDay: 6,
      open: new Date().setHours(8, 0, 0, 0) / 1000,
      close: new Date().setHours(18, 0, 0, 0) / 1000,
    },
  ]

  const input = new Local(
    "Doce & Companhia",
    "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    ["fake-image"],
    address,
    openingHours,
    city,
    "fake-category-id",
    undefined
  )
  const localRepository = new LocalRepositoryMemory()
  await localRepository.save(input)
  const getLocalById = new GetLocalById(localRepository)
  expect(async () => await getLocalById.execute({ id: "" })).rejects.toThrow(
    new Error("Local not found")
  )
})
