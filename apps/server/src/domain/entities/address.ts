export class Address {
  constructor(
    readonly cep: string,
    readonly street: string,
    readonly neighborhood: string,
    readonly number: string,
    readonly coordinate: { lat: number; long: number }
  ) {
    if (!cep || !street || !neighborhood || !number || !coordinate) {
      throw new Error("Insufficient information to create address")
    }
  }
}
