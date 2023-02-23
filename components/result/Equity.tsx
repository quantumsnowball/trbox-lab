import { FileNode } from "@/common/types";
import { useGetEquityQuery } from "@/redux/slices/apiSlice";
import { Box } from "@mui/material";
import { FC } from "react";



const Content: FC<{ path: string }> = ({ path }) => {
  const { data: equity } = useGetEquityQuery(path)
  console.log({ equity })

  return (
    <Box
      className='expanding flex row'
    >
      Equity
    </Box>
  )
}

const Equity: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path

  return (
    <Box
      id='viewer-div'
      className='expanding scroll flex column start stretch'
      sx={{ mx: 1 }}
    >
      {path ? <Content {...{ path }} /> : null}
    </Box>
  )
}

export default Equity
