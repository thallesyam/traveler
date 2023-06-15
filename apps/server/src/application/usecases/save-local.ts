import { CityRepository } from "@/application/repositories"
import { Address, Local } from "@/domain/entities"
import { LocalRepository } from "../repositories/local"

export class SaveLocal {
  constructor(
    readonly cityRepository: CityRepository,
    readonly localRepository: LocalRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const city = await this.cityRepository.findById(input.cityId)
    const localAlreadyAddInCity = city
      .getLocals()
      .find((cityLocal) => cityLocal.name === input.name)

    if (localAlreadyAddInCity) {
      throw new Error("Local with same name already register")
    }

    // Implementar a validação de categoria

    const local = new Local(
      input.name,
      input.description,
      input.images,
      input.address,
      input.openingHours,
      city,
      input.categoryId,
      input.observation
    )

    city.setLocal(local)

    await this.localRepository.save(local)

    return
  }
}

type Input = {
  name: string
  description: string
  images: string[]
  address: Address
  openingHours: {
    weekDay: number
    open: number | null
    close: number | null
  }[]
  cityId: string
  categoryId: string
  observation?: string
}
