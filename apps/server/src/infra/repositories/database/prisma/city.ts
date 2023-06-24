import { PrismaClient } from "@prisma/client"
import { Address, Category, City, Local } from "@/domain/entities"
import { CityRepository } from "@/application/repositories"

type IHours = {
  openingHours: {
    weekDay: number
    open: number | null
    close: number | null
  }[]
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
    const cities = await this.prisma.city.findMany({
      include: { locals: { include: { category: true } } },
    })

    return cities.map((city) => {
      const cityToEntity = new City(
        city.name,
        city.images as string[],
        city.description
      )

      cityToEntity.setCityId(city.id)

      city.locals.map((local) => {
        const addressData = local.address as unknown as Address
        const { openingHours } = local.openingHours as unknown as IHours

        const address = new Address(
          addressData.cep,
          addressData.street,
          addressData.neighborhood,
          addressData.number,
          addressData.coordinate
        )

        const category = new Category(
          local.category?.name as string,
          local.category?.image as string
        )
        category.setCategoryId(local.categoryId)
        const localToEntity = new Local(
          local.name,
          local.description,
          local.images as string[],
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
    })
  }

  async findByName(name: string): Promise<City | undefined> {
    const city = await this.prisma.city.findFirst({
      where: { name },
      include: { locals: { include: { category: true } } },
    })
    if (!city) {
      return undefined
    }
    const cityToEntity = new City(
      city.name,
      city.images as string[],
      city.description
    )

    cityToEntity.setCityId(city.id)

    city.locals.map((local) => {
      const addressData = local.address as unknown as Address
      const { openingHours } = local.openingHours as unknown as IHours

      const address = new Address(
        addressData.cep,
        addressData.street,
        addressData.neighborhood,
        addressData.number,
        addressData.coordinate
      )

      const category = new Category(
        local.category?.name as string,
        local.category?.image as string
      )
      category.setCategoryId(local.categoryId)
      const localToEntity = new Local(
        local.name,
        local.description,
        local.images as string[],
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

  async findById(id: string): Promise<City> {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: { locals: { include: { category: true } } },
    })

    if (!city) {
      throw new Error("City not found")
    }

    const cityToEntity = new City(
      city.name,
      city.images as string[],
      city.description
    )

    cityToEntity.setCityId(city.id)

    city.locals.map((local) => {
      const addressData = local.address as unknown as Address
      const { openingHours } = local.openingHours as unknown as IHours

      const address = new Address(
        addressData.cep,
        addressData.street,
        addressData.neighborhood,
        addressData.number,
        addressData.coordinate
      )

      const category = new Category(
        local.category?.name as string,
        local.category?.image as string
      )
      category.setCategoryId(local.categoryId)

      const localToEntity = new Local(
        local.name,
        local.description,
        local.images as string[],
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

  async findBySlug(slug: string): Promise<City> {
    const city = await this.prisma.city.findFirst({
      where: { slug },
      include: { locals: { include: { category: true } } },
    })

    if (!city) {
      throw new Error("City not found")
    }

    const cityToEntity = new City(
      city.name,
      city.images as string[],
      city.description
    )
    cityToEntity.setCityId(city.id)

    city.locals.map((local) => {
      const addressData = local.address as unknown as Address
      const { openingHours } = local.openingHours as unknown as IHours

      const address = new Address(
        addressData.cep,
        addressData.street,
        addressData.neighborhood,
        addressData.number,
        addressData.coordinate
      )

      const category = new Category(
        local.category?.name as string,
        local.category?.image as string
      )
      category.setCategoryId(local.categoryId)
      const localToEntity = new Local(
        local.name,
        local.description,
        local.images as string[],
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
