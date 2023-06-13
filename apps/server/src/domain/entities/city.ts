import { randomUUID } from "crypto"

export class City {
  private id: string

  constructor(
    readonly name: string,
    readonly images: string[],
    readonly description: string
  ) {
    this.id = this.generateCityId()

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
}
