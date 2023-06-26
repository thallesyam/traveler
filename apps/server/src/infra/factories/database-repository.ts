import {
  UserRepository,
  CommentRepository,
  LocalRepository,
  CategoryRepository,
  CityRepository,
} from "@/application/repositories"
import { RepositoryFactory } from "@/domain/factories"
import {
  CategoryRepositoryDatabase,
  CityRepositoryDatabase,
  CommentRepositoryDatabase,
  LocalRepositoryDatabase,
  UserRepositoryDatabase,
} from "@/infra/repositories/database/prisma"
import { PrismaClient } from "@prisma/client"

export class DatabaseRepository implements RepositoryFactory {
  userRepository?: UserRepository
  commentRepository?: CommentRepository
  localRepository?: LocalRepository
  categoryRepository?: CategoryRepository
  cityRepository?: CityRepository

  constructor(readonly prisma: PrismaClient) {}

  createUserRepository(): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepositoryDatabase(this.prisma)
    }

    return this.userRepository
  }

  createCommentRepository(): CommentRepository {
    if (!this.commentRepository) {
      this.commentRepository = new CommentRepositoryDatabase(this.prisma)
    }

    return this.commentRepository
  }

  createLocalRepository(): LocalRepository {
    if (!this.localRepository) {
      this.localRepository = new LocalRepositoryDatabase(this.prisma)
    }

    return this.localRepository
  }

  createCategoryRepository(): CategoryRepository {
    if (!this.categoryRepository) {
      this.categoryRepository = new CategoryRepositoryDatabase(this.prisma)
    }

    return this.categoryRepository
  }

  createCityRepository(): CityRepository {
    if (!this.cityRepository) {
      this.cityRepository = new CityRepositoryDatabase(this.prisma)
    }

    return this.cityRepository
  }
}
