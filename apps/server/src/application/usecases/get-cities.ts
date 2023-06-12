import { City } from "@/domain/entities"
import { CityRepository } from "@/application/repositories"

export class GetCities {
  constructor(readonly cityRepository: CityRepository) {}

  async execute(): Promise<City[]> {
    const cities = await this.cityRepository.findAll()
    return cities
  }
}
