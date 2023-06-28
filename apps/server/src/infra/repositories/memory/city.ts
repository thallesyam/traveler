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
    const city = this.cities.find((city) => city.getCityId() === id)

    if (!city) {
      throw new Error("City not found")
    }
    return city
  }

  async update(id: string, data: City): Promise<void> {
    this.cities = this.cities.map((city) => {
      if (city.getCityId() === id) {
        return data
      }

      return city
    })
  }

  async delete(id: string): Promise<void> {
    this.cities = this.cities.filter((city) => city.getCityId() !== id)
  }

  async findBySlug(slug: string): Promise<City> {
    const city = this.cities.find((city) => city.slug === slug)

    if (!city) {
      throw new Error("City not found")
    }
    return city
  }

  async restore(): Promise<void> {
    this.cities = []
  }
}
