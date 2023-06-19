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
}
