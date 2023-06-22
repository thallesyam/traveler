import { CommentRepository, LocalRepository } from "@/application/repositories"

export class ApproveComment {
  constructor(
    readonly commentRepository: CommentRepository,
    readonly localRepository: LocalRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const comment = await this.commentRepository.findById(input.id)
    const local = await this.localRepository.findById(comment.localId)
    comment.setStatus(input.status)
    await this.commentRepository.updateStatus(
      comment.getCommentId(),
      input.status
    )
    local.calculateRating()

    return
  }
}

type Input = {
  id: string
  status: "approved" | "reproved"
}
