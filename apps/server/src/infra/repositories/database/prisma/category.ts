import { PrismaClient } from "@prisma/client"
import { Category } from "@/domain/entities"
import { CategoryRepository } from "@/application/repositories"

type CategoryDatabaseModel = {
  name: string
  image: string
  id: string
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
    const categories = await this.prisma.category.findMany()

    if (!categories.length) return []

    return categories.map(toEntity)
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.prisma.category.findFirst({ where: { name } })

    if (!category) return undefined

    return toEntity(category)
  }

  async findById(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } })

    if (!category) {
      throw new Error("Category not found")
    }

    return toEntity(category)
  }

  async findByCityId(
    cityId: string
  ): Promise<{ name: string; quantity: number }[]> {
    const categories = await this.prisma.category.findMany({
      include: { local: { where: { cityId } } },
    })

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
}

function toEntity(category: CategoryDatabaseModel) {
  const categoryToEntity = new Category(category.name, category.image)
  categoryToEntity.setCategoryId(category.id)
  return categoryToEntity
}
