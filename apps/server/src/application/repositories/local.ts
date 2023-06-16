import { Local } from "@/domain/entities"

export interface LocalRepository {
  save(local: Local): Promise<void>
  findAll(): Promise<Local[]>
  findById(id: string): Promise<Local>
  findBySlug(slug: string): Promise<Local>
}
