import { Comment } from "@/domain/entities"
import { CommentRepository } from "@/application/repositories"

export class GetCommentById {
  constructor(readonly commentRepository: CommentRepository) {}

  async execute(input: Input): Promise<Comment> {
    const comment = await this.commentRepository.findById(input.id)
    return comment
  }
}

type Input = {
  id: string
}
