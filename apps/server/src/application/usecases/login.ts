import Password from "@/domain/entities/password"
import { UserRepository } from "@/domain/repositories/user"

export default class Login {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.getByEmail(input.email)

    if (user.password !== input.password) {
      throw new Error("Email ou senha inválido")
    }

    return {
      token: "123",
    }
  }
}

type Input = {
  email: string
  password: Password
}

type Output = {
  token: string
}
