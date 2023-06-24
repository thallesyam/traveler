import { PrismaClient } from "@prisma/client"
import { User } from "@/domain/entities"
import { UserRepository } from "@/application/repositories"

export class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        ...user,
        password: user.password.value,
      },
    })
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new Error("Email ou senha inválido")
    }

    return await User.buildExistingUser(user.name, user.email, user.password)
  }
}
