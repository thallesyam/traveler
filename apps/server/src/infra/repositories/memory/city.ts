import { City } from "@/domain/entities"
import { CityRepository } from "@/application/repositories"

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

  async findById(id: string): Promise<City> {
    const city = this.cities.find(
      (city) => city.id.toLowerCase() === id.toLowerCase()
    )
    if (!city) {
      throw new Error("City not found")
    }
    return city
  }
}
