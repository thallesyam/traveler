import { CityRepository, LocalRepository } from "@/application/repositories"

export class DeleteLocal {
  constructor(
    readonly cityRepository: CityRepository,
    readonly localRepository: LocalRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const local = await this.localRepository.findById(input.id)
    const city = await this.cityRepository.findById(local.cityId)
    city.removeLocal(local.getLocalId())
    await this.localRepository.delete(local.getLocalId())
    return
  }
}

type Input = {
  id: string
}
