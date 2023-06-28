import {
  CheckAuth,
  Login,
  SaveCity,
  GetCities,
  RestoreDatabase,
  GetCityById,
  GetCityBySlug,
  UpdateCity,
  DeleteCity,
} from "@/application/usecases"
import { HttpServer } from "@/infra/http/ports"

export class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly login: Login,
    readonly checkAuth: CheckAuth,
    readonly saveCity: SaveCity,
    readonly getCities: GetCities,
    readonly getCityById: GetCityById,
    readonly getCityBySlug: GetCityBySlug,
    readonly updateCity: UpdateCity,
    readonly deleteCity: DeleteCity,
    readonly restoreDatabase: RestoreDatabase
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

    httpServer.on("post", "/city", async function (params: any, body: any) {
      await saveCity.execute(body)
    })

    httpServer.on("get", "/cities", async function (params: any, body: any) {
      const cities = await getCities.execute()
      return { cities }
    })

    httpServer.on(
      "get",
      "/city/id/:id",
      async function (params: any, body: any) {
        const input = {
          id: params.id,
        }
        const city = await getCityById.execute(input)
        return { city }
      }
    )

    httpServer.on(
      "get",
      "/city/slug/:slug",
      async function (params: any, body: any) {
        const input = {
          slug: params.slug,
        }
        const city = await getCityBySlug.execute(input)
        return { city }
      }
    )

    httpServer.on("put", "/city/:id", async function (params: any, body: any) {
      const input = {
        id: params.id,
        data: body,
      }
      await updateCity.execute(input)
    })

    httpServer.on(
      "delete",
      "/city/:id",
      async function (params: any, body: any) {
        const input = {
          id: params.id,
        }
        await deleteCity.execute(input)
      }
    )

    httpServer.on(
      "delete",
      "/restore",
      async function (params: any, body: any) {
        await restoreDatabase.execute()
      }
    )
  }
}
