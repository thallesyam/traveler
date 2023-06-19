import { Category } from "@/domain/entities"
import { CategoryRepository } from "@/application/repositories"

export class GetCategories {
  constructor(readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    const cities = await this.categoryRepository.findAll()
    return cities
  }
}
