import { Comment } from "@/domain/entities"
import { CommentRepository, LocalRepository } from "@/application/repositories"

export class SaveComment {
  constructor(
    readonly commentRepository: CommentRepository,
    readonly localRepository: LocalRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const local = await this.localRepository.findById(input.localId)

    const comment = new Comment(
      input.name,
      input.image,
      input.text,
      input.rating,
      local.getLocalId()
    )

    await this.commentRepository.save(comment)
    local.setComment(comment)
    local.calculateRating()

    return
  }
}

type Input = {
  name: string
  image: string
  text: string
  localId: string
  rating: number
}
