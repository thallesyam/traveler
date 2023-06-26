import {
  CategoryRepository,
  CityRepository,
  CommentRepository,
  LocalRepository,
  UserRepository,
} from "@/application/repositories"

export interface RepositoryFactory {
  createUserRepository(): UserRepository
  createCommentRepository(): CommentRepository
  createLocalRepository(): LocalRepository
  createCategoryRepository(): CategoryRepository
  createCityRepository(): CityRepository
}
