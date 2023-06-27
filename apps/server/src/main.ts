import { PrismaClient } from "@prisma/client"
import { CheckAuth, Login } from "@/application/usecases"

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

  new RestController(httpServer, login, checkAuth)
  httpServer.listen(3000)
}

init()
