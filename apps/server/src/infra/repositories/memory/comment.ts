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
}
