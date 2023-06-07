import { City } from "@/domain/entities"

export interface CityRepository {
  save(city: City): Promise<void>
  findAll(): Promise<City[]>
  findByName(name: string): Promise<City | undefined>
}
