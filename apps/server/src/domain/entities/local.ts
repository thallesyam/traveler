import { Address, City } from "@/domain/entities"
import { randomUUID } from "crypto"

type IHours = {
  weekDay: number
  open: number | null
  close: number | null
}

export class Local {
  private id: string
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
    this.id = this.generateLocalId()

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

  private generateLocalId() {
    const uuid = randomUUID()
    return uuid
  }

  getLocalId() {
    return this.id
  }
}
