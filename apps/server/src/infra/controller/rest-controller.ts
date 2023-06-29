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
  SaveCategory,
  GetCategoryByCityId,
  GetCategoryById,
  GetCategories,
  UpdateCategory,
  DeleteCategory,
  SaveLocal,
  GetLocalById,
  GetLocals,
  GetLocalBySlug,
  DeleteLocal,
  UpdateLocal,
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
    readonly saveCategory: SaveCategory,
    readonly getCategoriesByCityId: GetCategoryByCityId,
    readonly getCategoryById: GetCategoryById,
    readonly getCategories: GetCategories,
    readonly updateCategory: UpdateCategory,
    readonly deleteCategory: DeleteCategory,
    readonly saveLocal: SaveLocal,
    readonly getLocals: GetLocals,
    readonly getLocalById: GetLocalById,
    readonly getLocalBySlug: GetLocalBySlug,
    readonly deleteLocal: DeleteLocal,
    readonly updateLocal: UpdateLocal,
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

    httpServer.on("post", "/category", async function (params: any, body: any) {
      await saveCategory.execute(body)
    })

    httpServer.on(
      "get",
      "/categories",
      async function (params: any, body: any) {
        const categories = await getCategories.execute()
        return { categories }
      }
    )

    httpServer.on(
      "get",
      "/category/byCityId/:cityId",
      async function (params: any, body: any) {
        const input = {
          cityId: params.cityId,
        }
        const categories = await getCategoriesByCityId.execute(input)
        return { categories }
      }
    )

    httpServer.on(
      "get",
      "/category/id/:categoryId",
      async function (params: any, body: any) {
        const input = {
          id: params.categoryId,
        }
        const category = await getCategoryById.execute(input)
        return { category }
      }
    )

    httpServer.on(
      "put",
      "/category/:id",
      async function (params: any, body: any) {
        const input = {
          id: params.id,
          data: body,
        }
        await updateCategory.execute(input)
      }
    )

    httpServer.on(
      "delete",
      "/category/:id",
      async function (params: any, body: any) {
        const input = {
          id: params.id,
        }
        await deleteCategory.execute(input)
      }
    )

    httpServer.on("post", "/local", async function (params: any, body: any) {
      await saveLocal.execute(body)
    })

    httpServer.on("get", "/locals", async function (params: any, body: any) {
      const locals = await getLocals.execute()
      return { locals }
    })

    httpServer.on(
      "get",
      "/local/id/:id",
      async function (params: any, body: any) {
        const input = {
          id: params.id,
        }
        const local = await getLocalById.execute(input)
        return { local }
      }
    )

    httpServer.on(
      "get",
      "/local/slug/:slug",
      async function (params: any, body: any) {
        const input = {
          slug: params.slug,
        }
        const local = await getLocalBySlug.execute(input)
        return { local }
      }
    )

    httpServer.on("put", "/local/:id", async function (params: any, body: any) {
      const input = {
        id: params.id,
        data: body,
      }
      await updateLocal.execute(input)
    })

    httpServer.on(
      "delete",
      "/local/:id",
      async function (params: any, body: any) {
        const input = {
          id: params.id,
        }
        await deleteLocal.execute(input)
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
