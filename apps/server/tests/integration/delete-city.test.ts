import { expect, test } from "vitest"
import { CityRepositoryMemory } from "@/infra/repositories/memory"
import { SaveCity } from "@/application/usecases"
import { DeleteCity } from "@/application/usecases/delete-city"

test("Deve deletar uma cidade com sucesso", async () => {
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
  const updateCity = new DeleteCity(cityRepository)
  await updateCity.execute({ id: city?.id ?? "" })
  const getCities = await cityRepository.findAll()
  expect(getCities).toHaveLength(0)
})
