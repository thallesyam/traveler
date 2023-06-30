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
    local.removeComment(comment.getCommentId())
    local.setComment(comment)
    local.calculateRating()

    const status = comment.getStatus() === true ? "approved" : "reproved"

    await this.commentRepository.updateStatus(comment.getCommentId(), status)

    await this.localRepository.update(local.getLocalId(), local)

    return
  }
}

type Input = {
  id: string
  status: "approved" | "reproved"
}
