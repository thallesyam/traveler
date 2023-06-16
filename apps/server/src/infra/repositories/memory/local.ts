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

  async findById(id: string): Promise<Local> {
    const local = this.locals.find((local) => local.getLocalId() === id)
    if (!local) {
      throw new Error("Local not found")
    }
    return local
  }
}
