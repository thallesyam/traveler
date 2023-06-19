import { Category } from "@/domain/entities"

export interface CategoryRepository {
  save(category: Category): Promise<void>
  findAll(): Promise<Category[]>
  findByName(name: string): Promise<Category | undefined>
}
