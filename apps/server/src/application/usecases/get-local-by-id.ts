import { Local } from "@/domain/entities"
import { LocalRepository } from "@/application/repositories"

export class GetLocalById {
  constructor(readonly localRepository: LocalRepository) {}

  async execute(input: Input): Promise<Local> {
    const local = await this.localRepository.findById(input.id)
    return local
  }
}

type Input = {
  id: string
}
