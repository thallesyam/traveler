import { Address, Category } from "@/domain/entities"
import { randomUUID } from "crypto"

type IHours = {
  weekDay: number
  open: number | null
  close: number | null
}

export class Local {
  private id: string
  private isHightlight = false
  readonly slug: string
  readonly createdAt = new Date()

  constructor(
    readonly name: string,
    readonly description: string,
    readonly images: string[],
    readonly address: Address,
    readonly openingHours: IHours[] | undefined,
    readonly cityId: string,
    readonly category: Category,
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
      !category
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

  getIsHightlight() {
    return this.isHightlight
  }

  setIsHightlight(boolean = true) {
    this.isHightlight = boolean
  }
}
