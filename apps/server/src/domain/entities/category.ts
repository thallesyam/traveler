import { randomUUID } from "crypto"

export class Category {
  private id: string

  constructor(
    readonly name: string,
    readonly image: string,
    readonly locals: { cityId: string; localId: string }[]
  ) {
    this.id = this.generateCategoryId()

    if (!name || !image || !locals) {
      throw new Error("Insufficient information to create category")
    }
  }

  private generateCategoryId() {
    const uuid = randomUUID()
    return uuid
  }

  getCategoryId() {
    return this.id
  }
}
