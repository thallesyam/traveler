import { expect, test } from "vitest"
import { City } from "@/domain/entities"

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

test("Deve criar uma cidade válida", async () => {
  const city = new City(mockCity.name, mockCity.images, mockCity.description)
  expect(city.name).toBe(mockCity.name)
  expect(city.images).toBe(mockCity.images)
  expect(city.description).toBe(mockCity.description)
})

test("Deve tentar criar uma cidade informação", async () => {
  expect(() => new City(mockCity.name, [], mockCity.description)).toThrowError(
    new Error("Insufficient information to create the city")
  )
})
