import { TreeDict } from "@/common/types"
import { Paper, Typography } from "@mui/material"
import { FC } from "react"


const LabSummary: FC<{ node: TreeDict }> = ({ node }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        textAlign: 'left',
        m: 1,
        p: 1,
      }}
    >
      {Object.keys(node).map(name => {
        const item = node[name]
        // a dir
        if (item) {
          return (
            <div key={name}>
              <Typography variant='h6'>{name}/</Typography>
              <LabSummary node={item} />
            </div>
          )
        }
        // a *.py file
        else {
          return (
            <div key={name}>
              <Typography key={name} variant='h6'>{name}</Typography>
            </div>
          )
        }
      })}
    </Paper>
  )
}


export default LabSummary
