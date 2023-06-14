export class Address {
  private coordinate: { lat: number; long: number }

  constructor(
    readonly cep: string,
    readonly street: string,
    readonly neighborhood: string,
    readonly number: string
  ) {
    this.coordinate = this.generateCoordinate()

    if (!cep || !street || !neighborhood || !number) {
      throw new Error("Insufficient information to create address")
    }
  }

  private generateCoordinate() {
    const lat = 10
    const long = 10

    return { lat, long }
  }

  getCoordinate() {
    return this.coordinate
  }
}
