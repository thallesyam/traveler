import Password from "./password"

export default class User {
  createdAt = new Date()

  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: Password
  ) {
    if (!name || !email || !password || !this.createdAt) {
      throw new Error("Insufficient information to create the user")
    }
  }

  static async create(name: string, email: string, password: string) {
    return new User(name, email, await Password.create(password, "salt"))
  }

  async validatePassword(password: string) {
    return this.password.validate(password)
  }
}
