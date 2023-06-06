export default class User {
  createdAt = new Date()

  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string
  ) {
    if (!name || !email || !password || !this.createdAt) {
      throw new Error("Insufficient information to create the user")
    }
  }
}
