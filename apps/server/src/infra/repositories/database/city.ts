import { PrismaClient } from "@prisma/client"
import { City } from "@/domain/entities"
import { CityRepository } from "@/application/repositories"

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
    const cities = await this.prisma.city.findMany()

    return cities.map((city) => {
      const cityToEntity = new City(
        city.name,
        city.images as string[],
        city.description
      )
      cityToEntity.setCityId(city.id)
      return cityToEntity
    })
  }

  async findByName(name: string): Promise<City | undefined> {
    const city = await this.prisma.city.findFirst({ where: { name } })
    if (!city) {
      return undefined
    }
    const cityToEntity = new City(
      city.name,
      city.images as string[],
      city.description
    )
    cityToEntity.setCityId(city.id)
    return cityToEntity
  }

  async findById(id: string): Promise<City> {
    const city = await this.prisma.city.findUnique({ where: { id } })

    if (!city) {
      throw new Error("City not found")
    }

    const cityToEntity = new City(
      city.name,
      city.images as string[],
      city.description
    )
    cityToEntity.setCityId(city.id)
    return cityToEntity
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

  async findBySlug(slug: string): Promise<City> {
    const city = await this.prisma.city.findFirst({ where: { slug } })

    if (!city) {
      throw new Error("City not found")
    }

    const cityToEntity = new City(
      city.name,
      city.images as string[],
      city.description
    )
    cityToEntity.setCityId(city.id)
    return cityToEntity
  }
}
