import { randomUUID } from "crypto"
import { Local } from "@/domain/entities"

export class City {
  private id: string
  private locals: Local[]
  readonly slug: string

  constructor(
    readonly name: string,
    readonly images: string[],
    readonly description: string
  ) {
    this.id = this.generateCityId()
    this.slug = this.generateCitySlug()
    this.locals = []

    if (!name || !images.length || !description) {
      throw new Error("Insufficient information to create the city")
    }
  }

  private generateCityId() {
    const uuid = randomUUID()
    return uuid
  }

  private generateCitySlug() {
    return this.name
      .toLowerCase()
      .replace(/[^a-z0-9\-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/--+/g, "-")
  }

  getCityId() {
    return this.id
  }

  setCityId(id: string) {
    this.id = id
  }

  getLocals() {
    return this.locals
  }

  removeLocal(localId: string) {
    this.locals = this.locals.filter((local) => local.getLocalId() !== localId)
  }

  setLocal(local: Local) {
    this.locals.push(local)
  }
}
