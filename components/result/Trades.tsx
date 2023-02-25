import { FileNode } from "@/common/types";
import { useGetTradesQuery } from "@/redux/slices/apiSlice";
import { Box } from "@mui/material";
import { FC } from "react";

const Content: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const { data } = useGetTradesQuery({ path, strategy })
  const trades = data?.data
  if (trades) console.log(trades)
  return (
    <>
      {trades ?
        trades.map(t => <div>{t.Date}</div>)
        : null}
    </>
  )

}

const Trades: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path
  const strategy = 'basic' // TODO

  return (
    <Box
      className='expanding flex column'
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

