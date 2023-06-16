import { Address, City } from "@/domain/entities"
import { randomUUID } from "crypto"

type IHours = {
  weekDay: number
  open: number | null
  close: number | null
}

export class Local {
  private id: string
  readonly slug: string
  createdAt = new Date()

  constructor(
    readonly name: string,
    readonly description: string,
    readonly images: string[],
    readonly address: Address,
    readonly openingHours: IHours[] | undefined,
    readonly cityId: string,
    readonly categoryId: string,
    readonly observation?: string
  ) {
    this.id = this.generateLocalId()
    this.slug = this.generateLocalSlug()

    if (
      !name ||
      !description ||
      !images.length ||
      !address ||
      !cityId ||
      !categoryId
    ) {
      throw new Error("Insufficient information to create local")
    }
  }

  private generateLocalId() {
    const uuid = randomUUID()
    return uuid
  }

  private generateLocalSlug() {
    return this.name
      .toLowerCase()
      .replace(/[^a-z0-9\-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/--+/g, "-")
  }

  getLocalId() {
    return this.id
  }

  setLocalId(id: string) {
    this.id = id
  }
}
