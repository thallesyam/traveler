import { CommentRepository, LocalRepository } from "@/application/repositories"

export class DeleteComment {
  constructor(
    readonly commentRepository: CommentRepository,
    readonly localRepository: LocalRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const comment = await this.commentRepository.findById(input.id)
    const local = await this.localRepository.findById(comment.localId)
    await this.commentRepository.delete(comment.getCommentId())
    local.removeComment(comment.getCommentId())
    return
  }
}

type Input = {
  id: string
}
