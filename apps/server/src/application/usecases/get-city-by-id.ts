import { City } from "@/domain/entities"
import { CityRepository } from "@/application/repositories"

export class GetCityById {
  constructor(readonly cityRepository: CityRepository) {}

  async execute(input: Input): Promise<City> {
    const city = await this.cityRepository.findById(input.id)
    return city
  }
}

type Input = {
  id: string
}
