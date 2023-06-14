import { randomUUID } from "crypto"

export class Address {
  private id: string

  constructor(
    readonly cep: string,
    readonly street: string,
    readonly neighborhood: string,
    readonly number: string,
    readonly coordinate: { lat: number; long: number }
  ) {
    this.id = this.generateAddressId()

    if (!cep || !street || !neighborhood || !number || !coordinate) {
      throw new Error("Insufficient information to create address")
    }
  }

  private generateAddressId() {
    const uuid = randomUUID()
    return uuid
  }

  getCoordinate() {
    return this.coordinate
  }

  getAdressId() {
    return this.id
  }
}
