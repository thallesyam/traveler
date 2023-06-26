import { Comment } from "@/domain/entities"
import { CommentRepository } from "@/application/repositories"
import { PrismaClient } from "@prisma/client"

export class CommentRepositoryDatabase implements CommentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(comment: Comment): Promise<void> {
    await this.prisma.comment.create({
      data: {
        name: comment.name,
        image: comment.image,
        text: comment.text,
        rating: comment.rating,
        localId: comment.localId,
        status: comment.getStatus(),
      },
    })
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany()

    return comments.map((comment) => {
      const commentToEntity = new Comment(
        comment.name,
        comment.image,
        comment.text,
        comment.rating,
        comment.localId as string
      )

      if (comment.status !== null) {
        commentToEntity.setStatus(
          comment.status === true ? "approved" : "reproved"
        )
      }
      commentToEntity.setCommentId(comment.id)
      return commentToEntity
    })
  }

  async findById(id: string): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({ where: { id } })

    if (!comment) {
      throw new Error("Comment not found")
    }

    const commentToEntity = new Comment(
      comment.name,
      comment.image,
      comment.text,
      comment.rating,
      comment.localId as string
    )
    if (comment.status !== null) {
      commentToEntity.setStatus(
        comment.status === true ? "approved" : "reproved"
      )
    }
    commentToEntity.setCommentId(comment.id)
    return commentToEntity
  }

  async updateStatus(
    id: string,
    status: "approved" | "reproved"
  ): Promise<void> {
    const comment = await this.findById(id)
    comment.setStatus(status)
    await this.prisma.comment.update({
      where: { id },
      data: {
        status: comment.getStatus(),
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comment.delete({ where: { id } })
  }
}
