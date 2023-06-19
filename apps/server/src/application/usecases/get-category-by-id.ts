import { Category } from "@/domain/entities"
import { CategoryRepository } from "@/application/repositories"

export class GetCategoryById {
  constructor(readonly categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Category> {
    const category = await this.categoryRepository.findById(input.id)
    return category
  }
}

type Input = {
  id: string
}
