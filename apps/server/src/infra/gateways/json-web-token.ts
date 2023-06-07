import User from "@/domain/entities/user"
import { sign, verify } from "jsonwebtoken"

export default class JsonWebToken {
  constructor(readonly key: string) {}

  generate(user: User, expiresIn: number, issueDate: Date) {
    return sign(
      { email: user.email, iat: issueDate.getTime(), expiresIn },
      this.key
    )
  }

  verify(token: string): any {
    return verify(token, this.key)
  }
}
