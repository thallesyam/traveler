import { randomUUID } from "crypto"

export class Address {
  private coordinate: { lat: number; long: number }
  private id: string

  constructor(
    readonly cep: string,
    readonly street: string,
    readonly neighborhood: string,
    readonly number: string
  ) {
    this.coordinate = this.generateCoordinate()
    this.id = this.generateAddressId()

    if (!cep || !street || !neighborhood || !number) {
      throw new Error("Insufficient information to create address")
    }
  }

  private generateCoordinate() {
    const lat = 10
    const long = 10

    return { lat, long }
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
