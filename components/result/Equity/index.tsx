import { FileNode } from "@/common/types";
import { Box } from "@mui/material";
import { FC } from "react";
import PlotlyChart from "./PlotlyChart";
import SelectBar from "./SelectBar";


const Equity: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path

  return (
    <Box
      id='viewer-div'
      className='expanding scroll flex column start stretch'
    >
      {
        path ?
          <>
            <SelectBar {...{ path }} />
            <PlotlyChart {...{ path }} />
          </>
          :
          null
      }
    </Box>
  )
}

export default Equity
