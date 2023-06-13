import { CityRepository } from "@/application/repositories"

export class DeleteCity {
  constructor(readonly cityRepository: CityRepository) {}

  async execute(input: Input): Promise<void> {
    const city = await this.cityRepository.findById(input.id)
    await this.cityRepository.delete(city.getCityId())
    return
  }
}

type Input = {
  id: string
}
