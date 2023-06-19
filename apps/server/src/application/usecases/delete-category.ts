import { CategoryRepository, LocalRepository } from "@/application/repositories"

export class DeleteCategory {
  constructor(
    readonly categoryRepository: CategoryRepository,
    readonly localRepository: LocalRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const category = await this.categoryRepository.findById(input.id)
    await this.categoryRepository.delete(category.getCategoryId())
    category
      .getLocalsInCategory()
      .map(async (local) => await this.localRepository.delete(local.localId))

    return
  }
}

type Input = {
  id: string
}
