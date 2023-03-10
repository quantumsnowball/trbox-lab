import { FileNode } from "@/common/types"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { FC } from "react"


const Study: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path

  return (
    <Box
      className='expanding flex column center'
    >
      <Typography
        variant='h4'
      >
        Show marks plotting here
      </Typography>
      {path}
    </Box>
  )

}
export default Study
