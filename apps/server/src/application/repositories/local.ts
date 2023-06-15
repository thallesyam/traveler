import { Local } from "@/domain/entities"

export interface LocalRepository {
  save(local: Local): Promise<void>
  findAll(): Promise<Local[]>
}
