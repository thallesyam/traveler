import { Token } from "@/application/gateways"
import { UserRepository } from "@/application/repositories"

export class Login {
  constructor(
    readonly userRepository: UserRepository,
    readonly tokenGateway: Token
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.getByEmail(input.email)
    const isValidPassword = await user.validatePassword(input.password)

    if (!isValidPassword) {
      throw new Error("Email ou senha inválido")
    }

    const token = await this.tokenGateway.generate(user, 100000000, new Date())

    return {
      token,
    }
  }
}

type Input = {
  email: string
  password: string
}

type Output = {
  token: string
}
