export class City {
  constructor(
    readonly name: string,
    readonly images: string[],
    readonly description: string
  ) {
    if (!name || !images.length || !description) {
      throw new Error("Insufficient information to create the city")
    }
  }
}
