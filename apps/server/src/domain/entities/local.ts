import { Address, City } from "@/domain/entities"

type IHours = {
  weekDay: number
  open: number | null
  close: number | null
}

export class Local {
  createdAt = new Date()

  constructor(
    readonly name: string,
    readonly description: string,
    readonly images: string[],
    readonly address: Address,
    readonly openingHours: IHours[] | undefined,
    readonly city: City,
    readonly categoryId: string,
    readonly observation?: string
  ) {
    if (
      !name ||
      !description ||
      !images.length ||
      !address ||
      !city ||
      !categoryId
    ) {
      throw new Error("Insufficient information to create local")
    }
  }
}
