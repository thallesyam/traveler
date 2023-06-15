import { Local } from "@/domain/entities"
import { LocalRepository } from "@/application/repositories"

export class LocalRepositoryMemory implements LocalRepository {
  locals: Local[]

  constructor() {
    this.locals = []
  }

  async save(local: Local): Promise<void> {
    this.locals.push(local)
  }

  async findAll(): Promise<Local[]> {
    return this.locals
  }
}
