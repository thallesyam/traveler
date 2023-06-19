import { Category } from "@/domain/entities"
import { CategoryRepository } from "@/application/repositories"

export class UpdateCategory {
  constructor(readonly categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<void> {
    const actualCategory = await this.categoryRepository.findById(input.id)

    const category = new Category(
      input.data?.name || actualCategory.name,
      input.data?.image || actualCategory.image
    )

    category.setCategoryId(actualCategory.getCategoryId())

    await this.categoryRepository.update(input.id, category)

    return
  }
}

type Input = {
  id: string
  data: {
    name?: string
    image?: string
  }
}
