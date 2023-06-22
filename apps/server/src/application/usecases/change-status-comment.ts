import { CommentRepository } from "@/application/repositories"

export class ApproveComment {
  constructor(readonly commentRepository: CommentRepository) {}

  async execute(input: Input): Promise<void> {
    const comment = await this.commentRepository.findById(input.id)
    comment.setStatus(input.status)

    return
  }
}

type Input = {
  id: string
  status: "approved" | "reproved"
}
