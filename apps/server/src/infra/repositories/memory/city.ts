import { City } from "@/domain/entities"
import { CityRepository } from "@/domain/repositories"

export class CityRepositoryMemory implements CityRepository {
  cities: City[]

  constructor() {
    this.cities = []
  }

  async save(city: City): Promise<void> {
    this.cities.push(city)
  }

  async findAll(): Promise<City[]> {
    return this.cities
  }

  async findByName(name: string): Promise<City | undefined> {
    const city = this.cities.find(
      (city) => city.name.toLowerCase() === name.toLowerCase()
    )
    return city
  }
}
