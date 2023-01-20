import express from "express"
import { initTRPC } from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
import cors from 'cors'
import { z } from "zod"

const app = express()
app.use(cors())

const t = initTRPC.create()

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return `Hello World`
  }),
  helloName: t.procedure
    // input 受け取れるデータの定義
    .input(z.object({ name: z.string(), age: z.number() }))
    .query(({ input }) => {
      return {
        name: `名前は${input.name}です。`,
        age: `年齢は${input.age}歳です。` 
      }
    })
})

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter
  })
)

app.listen(3000, () => console.log("Server is running..."))

export type AppRouter = typeof appRouter
