import { PrismaClient } from "@prisma/client"
import { Category } from "@/domain/entities"
import { CategoryRepository } from "@/application/repositories"

export type CategoryDatabaseModel = {
  name: string
  image: string
  id: string
  local: { cityId: string; localId: string }[]
}

export class CategoryRepositoryDatabase implements CategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(category: Category): Promise<void> {
    await this.prisma.category.create({
      data: {
        name: category.name,
        image: category.image,
      },
    })
  }

  async findAll(): Promise<Category[]> {
    const categories = (await this.prisma.category.findMany({
      include: { local: true },
    })) as unknown as CategoryDatabaseModel[]

    if (!categories.length) return []

    return categories.map(toEntityCategory)
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = (await this.prisma.category.findFirst({
      where: { name },
      include: { local: true },
    })) as unknown as CategoryDatabaseModel

    if (!category) return undefined

    return toEntityCategory(category)
  }

  async findById(id: string): Promise<Category> {
    const category = (await this.prisma.category.findUnique({
      where: { id },
      include: { local: true },
    })) as unknown as CategoryDatabaseModel

    if (!category) {
      throw new Error("Category not found")
    }

    return toEntityCategory(category)
  }

  async findByCityId(
    cityId: string
  ): Promise<{ name: string; quantity: number }[]> {
    const categories = (await this.prisma.category.findMany({
      include: { local: { where: { cityId } } },
    })) as unknown as CategoryDatabaseModel[]

    return categories.map((category) => ({
      name: category.name,
      quantity: category.local.length,
    }))
  }

  async update(id: string, data: Category): Promise<void> {
    await this.prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        image: data.image,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } })
  }

  async restore(): Promise<void> {
    await this.prisma.category.deleteMany()
  }
}

export function toEntityCategory(category: CategoryDatabaseModel) {
  const categoryToEntity = new Category(category.name, category.image)
  categoryToEntity.setCategoryId(category.id)
  category?.local?.map((local) =>
    categoryToEntity.setLocalInCategory(local.cityId, local.localId)
  )
  return categoryToEntity
}
