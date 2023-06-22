import { randomUUID } from "crypto"

export class Comment {
  private id: string
  private status: boolean | undefined
  readonly createdAt = new Date()

  constructor(
    readonly name: string,
    readonly image: string,
    readonly text: string,
    readonly rating: number,
    readonly localId: string
  ) {
    this.id = this.generateCommentId()

    if (!name || !image || !text || !rating || !localId) {
      throw new Error("Insufficient information to create a comment")
    }
  }

  private generateCommentId() {
    const uuid = randomUUID()
    return uuid
  }

  getCommentId() {
    return this.id
  }

  setStatus() {
    this.status = true
  }

  getStatus() {
    return this.status
  }
}
