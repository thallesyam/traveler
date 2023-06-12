import { randomUUID } from "crypto"

export class City {
  constructor(
    readonly name: string,
    readonly images: string[],
    readonly description: string,
    readonly id?: string
  ) {
    this.id = id || this.generateCityId()

    if (!name || !images.length || !description) {
      throw new Error("Insufficient information to create the city")
    }
  }

  private generateCityId() {
    const uuid = randomUUID()
    return uuid
  }
}
