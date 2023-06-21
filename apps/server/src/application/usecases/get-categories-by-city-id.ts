import { CategoryRepository } from "@/application/repositories"

export class GetCategoryByCityId {
  constructor(readonly categoryRepository: CategoryRepository) {}

  async execute(input: Input): Promise<Output[]> {
    const category = await this.categoryRepository.findByCityId(input.cityId)
    return category
  }
}

type Input = {
  cityId: string
}

type Output = {
  name: string
  quantity: number
}
