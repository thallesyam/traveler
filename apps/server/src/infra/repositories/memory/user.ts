import { User } from "@/domain/entities"
import { UserRepository } from "@/application/repositories"

export class UserRepositoryMemory implements UserRepository {
  users: User[]

  constructor() {
    this.users = []
    this.createDefaultUser()
  }

  private async createDefaultUser() {
    const defaultUser = await User.create(
      "Thalles Ian",
      "thallesyam@gmail.com",
      "admin@123"
    )

    this.users.push(defaultUser)
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
