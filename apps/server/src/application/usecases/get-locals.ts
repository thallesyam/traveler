import { Local } from "@/domain/entities"
import { LocalRepository } from "@/application/repositories"

export class GetLocals {
  constructor(readonly localRepository: LocalRepository) {}

  async execute(): Promise<Local[]> {
    const locals = await this.localRepository.findAll()
    return locals
  }
}
