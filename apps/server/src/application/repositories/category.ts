import { Category } from "@/domain/entities"

export interface CategoryRepository {
  save(category: Category): Promise<void>
  findAll(): Promise<Category[]>
  findByName(name: string): Promise<Category | undefined>
  findById(id: string): Promise<Category>
  findByCityId(cityId: string): Promise<{ name: string; quantity: number }[]>
  update(id: string, data: Category): Promise<void>
  delete(id: string): Promise<void>
  restore(): Promise<void>
}
