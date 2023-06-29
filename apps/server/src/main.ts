import { PrismaClient } from "@prisma/client"
import {
  CheckAuth,
  DeleteCategory,
  DeleteCity,
  GetCategories,
  GetCategoryByCityId,
  GetCategoryById,
  GetCities,
  GetCityById,
  GetCityBySlug,
  Login,
  RestoreDatabase,
  SaveCategory,
  SaveCity,
  UpdateCategory,
  UpdateCity,
  SaveLocal,
  GetLocalById,
  GetLocals,
  GetLocalBySlug,
  DeleteLocal,
  UpdateLocal,
} from "@/application/usecases"

import { ExpressAdapter } from "@/infra/http/adapter"
import { RestController } from "@/infra/controller/rest-controller"
import { DatabaseRepository, MemoryRepository } from "@/infra/factories"
import { JsonWebToken } from "@/infra/gateways"

async function init() {
  // const prisma = new PrismaClient()
  // const repositoryFactory = new DatabaseRepository(prisma)
  const repositoryFactory = new MemoryRepository()
  const tokenGateway = new JsonWebToken("traveler")
  const httpServer = new ExpressAdapter()

  const login = new Login(
    repositoryFactory.createUserRepository(),
    tokenGateway
  )
  const checkAuth = new CheckAuth(tokenGateway)
  const saveCity = new SaveCity(repositoryFactory.createCityRepository())
  const getCities = new GetCities(repositoryFactory.createCityRepository())
  const getCity = new GetCityById(repositoryFactory.createCityRepository())
  const getCityBySlug = new GetCityBySlug(
    repositoryFactory.createCityRepository()
  )
  const updateCity = new UpdateCity(repositoryFactory.createCityRepository())
  const deleteCity = new DeleteCity(repositoryFactory.createCityRepository())

  const saveCategory = new SaveCategory(
    repositoryFactory.createCategoryRepository()
  )
  const getCategories = new GetCategories(
    repositoryFactory.createCategoryRepository()
  )
  const getCategoryByCityId = new GetCategoryByCityId(
    repositoryFactory.createCategoryRepository()
  )
  const getCategoryById = new GetCategoryById(
    repositoryFactory.createCategoryRepository()
  )
  const updateCategory = new UpdateCategory(
    repositoryFactory.createCategoryRepository()
  )
  const deleteCategory = new DeleteCategory(
    repositoryFactory.createCategoryRepository(),
    repositoryFactory.createLocalRepository()
  )

  const saveLocal = new SaveLocal(
    repositoryFactory.createCityRepository(),
    repositoryFactory.createCategoryRepository(),
    repositoryFactory.createLocalRepository()
  )
  const getLocals = new GetLocals(repositoryFactory.createLocalRepository())
  const getLocal = new GetLocalById(repositoryFactory.createLocalRepository())
  const getLocalBySlug = new GetLocalBySlug(
    repositoryFactory.createLocalRepository()
  )
  const updateLocal = new UpdateLocal(
    repositoryFactory.createLocalRepository(),
    repositoryFactory.createCityRepository(),
    repositoryFactory.createCategoryRepository()
  )
  const deleteLocal = new DeleteLocal(
    repositoryFactory.createCityRepository(),
    repositoryFactory.createLocalRepository()
  )

  const restoreDatabase = new RestoreDatabase(
    repositoryFactory.createCityRepository(),
    repositoryFactory.createCategoryRepository(),
    repositoryFactory.createLocalRepository(),
    repositoryFactory.createCommentRepository()
  )

  new RestController(
    httpServer,
    login,
    checkAuth,
    saveCity,
    getCities,
    getCity,
    getCityBySlug,
    updateCity,
    deleteCity,
    saveCategory,
    getCategoryByCityId,
    getCategoryById,
    getCategories,
    updateCategory,
    deleteCategory,
    saveLocal,
    getLocals,
    getLocal,
    getLocalBySlug,
    deleteLocal,
    updateLocal,
    restoreDatabase
  )
  httpServer.listen(3000)
}

init()
