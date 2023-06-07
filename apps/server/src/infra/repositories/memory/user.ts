import { User } from "@/domain/entities"
import { UserRepository } from "@/domain/repositories"

export class UserRepositoryMemory implements UserRepository {
  users: User[]

  constructor() {
    this.users = []
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }

  async getByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)
    if (!user) {
      throw new Error("Email ou senha inválido")
    }
    return user
  }
}
