import { trpc } from "../utils/trpc"

const Test = () => {
  const { data } = trpc.hello.useQuery();

  return <div>{data}</div>
}

export default Test
