import { Address, Category, Comment } from "@/domain/entities"
import { randomUUID } from "crypto"

type IHours = {
  weekDay: number
  open: number | null
  close: number | null
}

const MAX_CALCULATION_RATING = 5

export class Local {
  private id: string
  private isHightlight = false
  private comments: Comment[] = []
  private rating: number | undefined = undefined
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

  setComment(comment: Comment) {
    this.comments.push(comment)
  }

  getLocalComments() {
    return this.comments
  }

  calculateRating() {
    const approvedComments = this.comments.filter(
      (comment) => comment.getStatus() === true
    )

    let sum = 0
    for (let i = 0; i < approvedComments.length; i++) {
      const normalizedRating =
        approvedComments[i].rating / MAX_CALCULATION_RATING
      sum += normalizedRating
    }

    const average = Number(
      ((sum / approvedComments.length) * MAX_CALCULATION_RATING).toPrecision(2)
    )

    this.rating = average
  }

  getRating() {
    return this.rating
  }

  removeComment(commentId: string) {
    this.comments = this.comments.filter(
      (local) => local.getCommentId() !== commentId
    )
  }
}
