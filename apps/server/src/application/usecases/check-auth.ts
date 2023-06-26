import { Token } from "@/application/gateways"

export class CheckAuth {
  constructor(readonly tokenGateway: Token) {}

  async execute(input: Input): Promise<Output> {
    const payload = this.tokenGateway.verify(input.token)
    return {
      email: payload.email,
    }
  }
}
type Input = {
  token: string
}

type Output = {
  email: string
}
