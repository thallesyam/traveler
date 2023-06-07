import { City } from "@/domain/entities"
import { CityRepository } from "@/domain/repositories"

export class SaveCity {
  constructor(readonly cityRepository: CityRepository) {}

  async execute(input: Input): Promise<void> {
    const hasExistCity = await this.cityRepository.findByName(input.name)

    if (hasExistCity) {
      throw new Error("A city with that name already exists")
    }

    await this.cityRepository.save(
      new City(input.name, input.images, input.description)
    )

    return
  }
}

type Input = {
  name: string
  images: string[]
  description: string
}
