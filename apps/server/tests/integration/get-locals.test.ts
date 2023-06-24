import { expect, test } from "vitest"
import { Address, Category, City, Local } from "@/domain/entities"
import {
  CategoryRepositoryMemory,
  CityRepositoryMemory,
  LocalRepositoryMemory,
} from "@/infra/repositories/memory"
import { GetLocals } from "@/application/usecases"

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

test("Deve buscar por todos os locais", async () => {
  const city = new City(mockCity.name, mockCity.images, mockCity.description)
  const category = new Category("Pontos Turísticos", "fake-images")
  const address = new Address(
    "08225260",
    "Rua Francisco da cunha",
    "Jardim Itapemirim",
    "533",
    { lat: 10, long: 10 }
  )

  const input = new Local(
    "Doce & Companhia",
    "O melhor lugar da cidade para você tomar um bom café. Fatias de tortas artesanais, bolos, lanches e biscoitos caseiros.",
    ["fake-image"],
    address,
    undefined,
    city.getCityId(),
    category,
    undefined
  )
  const cityRepository = new CityRepositoryMemory()
  const categoryRepository = new CategoryRepositoryMemory()
  const localRepository = new LocalRepositoryMemory()
  await cityRepository.save(city)
  await categoryRepository.save(category)
  await localRepository.save(input)
  const getLocalById = new GetLocals(localRepository)
  const locals = await getLocalById.execute()
  expect(locals).toHaveLength(1)
})

test("Deve buscar por todos os locais e não retornar nenhum dado", async () => {
  const localRepository = new LocalRepositoryMemory()
  const getLocalById = new GetLocals(localRepository)
  const locals = await getLocalById.execute()
  expect(locals).toHaveLength(0)
})
