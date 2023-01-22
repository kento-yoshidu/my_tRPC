import { useQueries } from "@tanstack/react-query"
import { trpc } from "../utils/trpc"

const Test = () => {
  const { data } = trpc.todos.useQuery()

  console.log("data is", data)

  return (
    <>
      <h1>hoge</h1>
    </>
  )
}

export default Test
