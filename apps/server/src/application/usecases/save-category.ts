import { Category } from "@/domain/entities"
import { CategoryRepository } from "@/application/repositories"

export class SaveCategory {
  constructor(readonly categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<void> {
    const hasExistCategory = await this.categoryRepository.findByName(
      input.name
    )

    if (hasExistCategory) {
      throw new Error("A category with that name already exists")
    }

    await this.categoryRepository.save(new Category(input.name, input.image))

    return
  }
}

type Input = {
  name: string
  image: string
}
