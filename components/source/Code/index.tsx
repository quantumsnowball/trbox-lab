import { useLazyRunSourceQuery } from "@/redux/slices/apiSlice"
import { FC } from "react"
import Stdout from "./Stdout"
import Viewer from "./Viewer"


const Code: FC<{ path: string }> = ({ path }) => {
  const [trigger, { data: runResult }] = useLazyRunSourceQuery()
  const run = () => trigger(path)

  return (
    <>
      <Viewer {...{ path, run }} />
      <Stdout {...{ runResult }} />
    </>
  )
}

export default Code
