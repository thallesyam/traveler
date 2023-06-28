import { Comment } from "@/domain/entities"
import { CommentRepository } from "@/application/repositories"

export class CommentRepositoryMemory implements CommentRepository {
  comments: Comment[]

  constructor() {
    this.comments = []
  }

  async save(city: Comment): Promise<void> {
    this.comments.push(city)
  }

  async findAll(): Promise<Comment[]> {
    return this.comments
  }

  async findById(id: string): Promise<Comment> {
    const comment = this.comments.find(
      (comment) => comment.getCommentId() === id
    )
    if (!comment) {
      throw new Error("Comment not found")
    }
    return comment
  }

  async updateStatus(
    id: string,
    status: "approved" | "reproved"
  ): Promise<void> {
    const comments = this.comments.map((comment) => {
      if (comment.getCommentId() === id) {
        comment.setStatus(status)
      }

      return comment
    })
    this.comments = comments
  }

  async delete(id: string): Promise<void> {
    this.comments = this.comments.filter(
      (comment) => comment.getCommentId() !== id
    )
  }

  async restore(): Promise<void> {
    this.comments = []
  }
}
