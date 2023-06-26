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
  constructor(readonly prisma: PrismaClient) {}

  createUserRepository(): UserRepository {
    return new UserRepositoryDatabase(this.prisma)
  }

  createCommentRepository(): CommentRepository {
    return new CommentRepositoryDatabase(this.prisma)
  }

  createLocalRepository(): LocalRepository {
    return new LocalRepositoryDatabase(this.prisma)
  }

  createCategoryRepository(): CategoryRepository {
    return new CategoryRepositoryDatabase(this.prisma)
  }

  createCityRepository(): CityRepository {
    return new CityRepositoryDatabase(this.prisma)
  }
}
