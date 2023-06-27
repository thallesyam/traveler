import express from "express"
import cors from "cors"
import { HttpServer } from "@/infra/http/ports"

export class ExpressAdapter implements HttpServer {
  app: any

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())
  }

  listen(port: number): void {
    this.app.listen(port)
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async (req: any, res: any) => {
      const output = await callback(req.params, req.body)
      res.json(output)
    })
  }
}
