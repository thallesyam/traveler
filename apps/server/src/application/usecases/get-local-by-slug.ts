import { Local } from "@/domain/entities"
import { LocalRepository } from "@/application/repositories"

export class GetLocalBySlug {
  constructor(readonly localRepository: LocalRepository) {}

  async execute(input: Input): Promise<Local> {
    const local = await this.localRepository.findBySlug(input.slug)
    return local
  }
}

type Input = {
  slug: string
}
