import { randomUUID } from "crypto"
import { Local } from "@/domain/entities"

export class City {
  private id: string
  private locals: Local[]

  constructor(
    readonly name: string,
    readonly images: string[],
    readonly description: string
  ) {
    this.id = this.generateCityId()
    this.locals = []

    if (!name || !images.length || !description) {
      throw new Error("Insufficient information to create the city")
    }
  }

  private generateCityId() {
    const uuid = randomUUID()
    return uuid
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

  setLocal(local: Local) {
    this.locals.push(local)
  }
}
