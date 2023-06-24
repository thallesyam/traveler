import { Address, Local } from "@/domain/entities"
import {
  CategoryRepository,
  CityRepository,
  LocalRepository,
} from "@/application/repositories"

export class SaveLocal {
  constructor(
    readonly cityRepository: CityRepository,
    readonly categoryRepository: CategoryRepository,
    readonly localRepository: LocalRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const city = await this.cityRepository.findById(input.cityId)
    const category = await this.categoryRepository.findById(input.categoryId)
    const localAlreadyAddInCity = city
      .getLocals()
      .find((cityLocal) => cityLocal.name === input.name)

    if (localAlreadyAddInCity) {
      throw new Error("Local with same name already register")
    }

    const local = new Local(
      input.name,
      input.description,
      input.images,
      input.address,
      input.openingHours,
      input.cityId,
      category,
      input.observation
    )

    if (input.isHightlight) {
      const locals = await this.localRepository.findByCityId(city.getCityId())
      locals.map((local) => {
        if (local.getIsHightlight()) {
          local.setIsHightlight(false)
        }

        return
      })

      local.setIsHightlight()
    }

    city.setLocal(local)
    category.setLocalInCategory(local.getLocalId(), city.getCityId())

    await this.categoryRepository.update(category.getCategoryId(), category)
    await this.cityRepository.update(city.getCityId(), city)
    await this.localRepository.save(local)

    return
  }
}

type Input = {
  name: string
  description: string
  images: string[]
  address: Address
  openingHours:
    | undefined
    | {
        weekDay: number
        open: number | null
        close: number | null
      }[]
  cityId: string
  categoryId: string
  observation?: string
  isHightlight?: boolean
}
