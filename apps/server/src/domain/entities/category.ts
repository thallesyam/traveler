import { randomUUID } from "crypto"

export class Category {
  private id: string
  private locals: { cityId: string; localId: string }[]

  constructor(readonly name: string, readonly image: string) {
    this.id = this.generateCategoryId()
    this.locals = []

    if (!name || !image) {
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

  setCategoryId(id: string) {
    this.id = id
  }

  getLocalsInCategory() {
    return this.locals
  }

  removeLocal(localId: string) {
    this.locals = this.locals.filter((local) => local.localId !== localId)
  }

  setLocalInCategory(localId: string, cityId: string) {
    this.locals.push({ localId, cityId })
  }
}
