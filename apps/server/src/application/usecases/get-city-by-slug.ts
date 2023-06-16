import { City } from "@/domain/entities"
import { CityRepository } from "@/application/repositories"

export class GetCityBySlug {
  constructor(readonly cityRepository: CityRepository) {}

  async execute(input: Input): Promise<City> {
    const city = await this.cityRepository.findBySlug(input.slug)
    return city
  }
}

type Input = {
  slug: string
}
