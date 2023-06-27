import { Login } from "@/application/usecases"
import { HttpServer } from "@/infra/http/ports"

export class RestController {
  constructor(readonly httpServer: HttpServer, readonly login: Login) {
    httpServer.on("post", "/login", async function (params: any, body: any) {
      const { token } = await login.execute(body)
      return { token }
    })
  }
}
