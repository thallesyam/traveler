import { JwtPayload, sign, verify } from "jsonwebtoken"
import { User } from "@/domain/entities"

export class JsonWebToken {
  constructor(readonly key: string) {}

  generate(user: User, expiresIn: number, issueDate: Date) {
    return sign(
      { email: user.email, iat: issueDate.getTime(), expiresIn },
      this.key
    )
  }

  verify(token: string): JwtPayload | string {
    try {
      return verify(token, this.key)
    } catch {
      throw new Error("Token malformated")
    }
  }
}
