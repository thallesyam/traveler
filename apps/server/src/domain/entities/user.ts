import Password from "./password"

export default class User {
  createdAt = new Date()

  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: Password
  ) {
    if (!this.isValidEmail(this.email)) {
      throw new Error("Invalid email")
    }

    if (!name || !email || !password || !this.createdAt) {
      throw new Error("Insufficient information to create the user")
    }
  }

  static async create(name: string, email: string, password: string) {
    return new User(name, email, await Password.create(password, "salt"))
  }

  isValidEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/)
  }

  async validatePassword(password: string) {
    return this.password.validate(password)
  }
}