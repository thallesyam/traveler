import {
  CategoryRepository,
  CityRepository,
  CommentRepository,
  LocalRepository,
} from "@/application/repositories"

export class RestoreDatabase {
  constructor(
    readonly cityRepository: CityRepository,
    readonly categoryRepository: CategoryRepository,
    readonly localRepository: LocalRepository,
    readonly commentRepository: CommentRepository
  ) {}

  async execute(): Promise<void> {
    await this.commentRepository.restore()
    await this.localRepository.restore()
    await this.categoryRepository.restore()
    await this.cityRepository.restore()
    return
  }
}
