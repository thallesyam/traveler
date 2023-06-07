import { User } from "@/domain/entities"

export interface Token {
  generate(user: User, expiresIn: number, issueDate: Date): any
  verify(token: string): any
}
