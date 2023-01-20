import { trpc } from "../utils/trpc"

const Test = () => {
  const data = trpc.helloName.useQuery({ name: "kento", age: 35 })

  return (
    <>
      <p>{data.data?.name}</p>
      <p>{data.data?.age}</p>
    </>
  )
}

export default Test
