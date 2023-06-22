import { Comment } from "@/domain/entities"

export interface CommentRepository {
  save(comment: Comment): Promise<void>
  findAll(): Promise<Comment[]>
  findById(id: string): Promise<Comment>
}
