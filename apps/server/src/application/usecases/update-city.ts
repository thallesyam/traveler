import { City } from "@/domain/entities"
import { CityRepository } from "@/application/repositories"

export class UpdateCity {
  constructor(readonly cityRepository: CityRepository) {}

  async execute(input: Input): Promise<void> {
    const actualCity = await this.cityRepository.findById(input.id)

    const city = new City(
      input.data?.name || actualCity.name,
      input.data?.images || actualCity.images,
      input.data?.description || actualCity.description,
      actualCity.id
    )
    await this.cityRepository.update(input.id, city)

    return
  }
}

type Input = {
  id: string
  data: {
    name?: string
    images?: string[]
    description?: string
  }
}
