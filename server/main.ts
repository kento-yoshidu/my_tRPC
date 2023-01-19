import express from "express"
import { initTRPC } from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"

const app = express()

const t = initTRPC.create()

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return `Hello World`
  })
})

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter
  })
)

app.listen(3000, () => console.log("Server is running..."))
