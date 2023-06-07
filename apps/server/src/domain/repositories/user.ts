import { User } from "@/domain/entities"

export interface UserRepository {
  save(user: User): Promise<void>
  getByEmail(email: string): Promise<User>
}
