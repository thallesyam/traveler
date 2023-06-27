import {
  UserRepository,
  CommentRepository,
  LocalRepository,
  CategoryRepository,
  CityRepository,
} from "@/application/repositories"
import { RepositoryFactory } from "@/application/factories"
import {
  CategoryRepositoryMemory,
  CityRepositoryMemory,
  CommentRepositoryMemory,
  LocalRepositoryMemory,
  UserRepositoryMemory,
} from "../repositories/memory"

export class MemoryRepository implements RepositoryFactory {
  private userRepository?: UserRepository
  private commentRepository?: CommentRepository
  private localRepository?: LocalRepository
  private categoryRepository?: CategoryRepository
  private cityRepository?: CityRepository

  createUserRepository(): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepositoryMemory()
    }

    return this.userRepository
  }

  createCommentRepository(): CommentRepository {
    if (!this.commentRepository) {
      this.commentRepository = new CommentRepositoryMemory()
    }

    return this.commentRepository
  }

  createLocalRepository(): LocalRepository {
    if (!this.localRepository) {
      this.localRepository = new LocalRepositoryMemory()
    }

    return this.localRepository
  }

  createCategoryRepository(): CategoryRepository {
    if (!this.categoryRepository) {
      this.categoryRepository = new CategoryRepositoryMemory()
    }

    return this.categoryRepository
  }

  createCityRepository(): CityRepository {
    if (!this.cityRepository) {
      this.cityRepository = new CityRepositoryMemory()
    }

    return this.cityRepository
  }
}
