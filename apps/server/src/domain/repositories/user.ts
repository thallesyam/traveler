import User from "@/domain/entities/user"

export interface UserRepository {
  save(user: User): Promise<void>
  getByEmail(email: string): Promise<User>
}
