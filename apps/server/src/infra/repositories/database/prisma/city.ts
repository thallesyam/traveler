import { PrismaClient } from "@prisma/client"
import { City } from "@/domain/entities"
import { CityRepository } from "@/application/repositories"
import {
  LocalDatabaseModel,
  toEntityLocal,
} from "@/infra/repositories/database/prisma"

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

  async restore(): Promise<void> {
    await this.prisma.city.deleteMany()
  }
}

export function toEntityCity(city: CityDatabaseModel) {
  const cityToEntity = new City(city.name, city.images, city.description)
  cityToEntity.setCityId(city.id)

  city.locals.map((local) => {
    const localToEntity = toEntityLocal(local)
    cityToEntity.setLocal(localToEntity)
  })

  return cityToEntity
}
