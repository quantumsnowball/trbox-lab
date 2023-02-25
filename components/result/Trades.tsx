import { FileNode } from "@/common/types";
import { useGetTradesQuery } from "@/redux/slices/apiSlice";
import { Box } from "@mui/material";
import { FC } from "react";

const Content: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const { data: { data: trades } } = useGetTradesQuery({ path, strategy })
  console.log(Object.entries(trades))
  return (
    <>
    </>
  )

}

const Trades: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path
  const strategy = 'basic'

  return (
    <Box
      className='expanding flex row'
    >
      {
        (path && strategy) ?
          <Content {...{ path, strategy }} />
          : null
      }
    </Box>
  )
}

export default Trades

