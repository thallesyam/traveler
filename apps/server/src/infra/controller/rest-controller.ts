import { CheckAuth, Login } from "@/application/usecases"
import { HttpServer } from "@/infra/http/ports"

export class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly login: Login,
    readonly checkAuth: CheckAuth
  ) {
    httpServer.on("post", "/login", async function (params: any, body: any) {
      const { token } = await login.execute(body)
      return { token }
    })

    httpServer.on(
      "post",
      "/check-auth",
      async function (params: any, body: any) {
        const { email } = await checkAuth.execute(body)
        return { email }
      }
    )
  }
}
