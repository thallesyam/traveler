import { PrismaClient } from "@prisma/client"
import { Address, City, Local } from "@/domain/entities"
import { CityRepository } from "@/application/repositories"
import {
  CategoryDatabaseModel,
  toEntityCategory,
} from "@/infra/repositories/database/prisma"

type IHours = {
  openingHours: {
    weekDay: number
    open: number | null
    close: number | null
  }[]
}

type LocalDatabaseModel = {
  id: string
  isHightlight: boolean
  address: Address
  category: CategoryDatabaseModel
  openingHours: IHours
  name: string
  description: string
  images: string[]
  cityId: string
  observation?: string
}

type CityDatabaseModel = {
  id: string
  name: string
  images: string[]
  description: string
  locals: LocalDatabaseModel[]
}

export class CityRepositoryDatabase implements CityRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(city: City): Promise<void> {
    await this.prisma.city.create({
      data: {
        name: city.name,
        description: city.description,
        images: city.images,
        slug: city.slug,
      },
    })
  }

  async findAll(): Promise<City[]> {
    const cities = (await this.prisma.city.findMany({
      include: { locals: { include: { category: true } } },
    })) as unknown as CityDatabaseModel[]

    return cities.map(toEntityCity)
  }

  async findByName(name: string): Promise<City | undefined> {
    const city = (await this.prisma.city.findFirst({
      where: { name },
      include: { locals: { include: { category: true } } },
    })) as unknown as CityDatabaseModel

    if (!city) {
      return undefined
    }

    return toEntityCity(city)
  }

  async findById(id: string): Promise<City> {
    const city = (await this.prisma.city.findUnique({
      where: { id },
      include: { locals: { include: { category: true } } },
    })) as unknown as CityDatabaseModel

    if (!city) {
      throw new Error("City not found")
    }
    return toEntityCity(city)
  }

  async findBySlug(slug: string): Promise<City> {
    const city = (await this.prisma.city.findFirst({
      where: { slug },
      include: { locals: { include: { category: true } } },
    })) as unknown as CityDatabaseModel

    if (!city) {
      throw new Error("City not found")
    }
    return toEntityCity(city)
  }

  async update(id: string, data: City): Promise<void> {
    await this.prisma.city.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        images: data.images,
        slug: data.slug,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.city.delete({ where: { id } })
  }
}

export function toEntityCity(city: CityDatabaseModel) {
  const cityToEntity = new City(city.name, city.images, city.description)
  cityToEntity.setCityId(city.id)

  city.locals.map((local) => {
    const addressData = local.address
    const { openingHours } = local.openingHours

    const address = new Address(
      addressData.cep,
      addressData.street,
      addressData.neighborhood,
      addressData.number,
      addressData.coordinate
    )

    const category = toEntityCategory(local.category)
    const localToEntity = new Local(
      local.name,
      local.description,
      local.images,
      address,
      openingHours,
      local.cityId,
      category,
      local?.observation ?? ""
    )
    localToEntity.setLocalId(local.id)
    localToEntity.setIsHightlight(!!local.isHightlight)
    cityToEntity.setLocal(localToEntity)
  })

  return cityToEntity
}
