import { Category } from "@/domain/entities"
import { CategoryRepository } from "@/application/repositories"

export class CategoryRepositoryMemory implements CategoryRepository {
  categories: Category[]

  constructor() {
    this.categories = []
  }

  async save(category: Category): Promise<void> {
    this.categories.push(category)
  }

  async findAll(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find((category) => category.name === name)
    return category
  }

  async findById(id: string): Promise<Category> {
    const category = this.categories.find(
      (category) => category.getCategoryId() === id
    )

    if (!category) {
      throw new Error("Category not found")
    }
    return category
  }

  async findByCityId(
    cityId: string
  ): Promise<{ name: string; quantity: number }[]> {
    const locals = this.categories.filter((category) =>
      category.getLocalsInCategory().some((local) => local.cityId === cityId)
    )

    const count = locals.map((category) => {
      return {
        name: category.name,
        quantity: category
          .getLocalsInCategory()
          .filter((local) => local.cityId === cityId).length,
      }
    })

    return count
  }

  async update(id: string, data: Category): Promise<void> {
    this.categories = this.categories.map((category) => {
      if (category.getCategoryId() === id) {
        return data
      }

      return category
    })
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter(
      (category) => category.getCategoryId() !== id
    )
  }
}
