import { Address, Local } from "@/domain/entities"
import { CityRepository, LocalRepository } from "@/application/repositories"

type IHours = {
  weekDay: number
  open: number | null
  close: number | null
}

export class UpdateLocal {
  constructor(
    readonly localRepository: LocalRepository,
    readonly cityRepository: CityRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const actualLocal = await this.localRepository.findById(input.id)
    const city = await this.cityRepository.findById(actualLocal.cityId)

    const local = new Local(
      input.data?.name || actualLocal.name,
      input.data?.description || actualLocal.description,
      input.data?.images || actualLocal.images,
      input.data?.address || actualLocal.address,
      input.data?.openingHours || actualLocal.openingHours,
      actualLocal.cityId,
      input.data?.categoryId || actualLocal.categoryId,
      input.data?.observation || actualLocal.observation
    )

    local.setLocalId(actualLocal.getLocalId())

    await this.localRepository.update(input.id, local)
    city.removeLocal(input.id)
    city.setLocal(local)

    return
  }
}

type Input = {
  id: string
  data: {
    name?: string
    images?: string[]
    description?: string
    address?: Address
    openingHours?: IHours[] | undefined
    categoryId?: string
    observation?: string
  }
}
