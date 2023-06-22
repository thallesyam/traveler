import { Comment } from "@/domain/entities"
import { CommentRepository } from "@/application/repositories"

export class GetComments {
  constructor(readonly commentRepository: CommentRepository) {}

  async execute(): Promise<Comment[]> {
    const comments = await this.commentRepository.findAll()
    return comments
  }
}
