import { RunResult } from "@/redux/slices/apiSlice"
import { Paper, Typography } from "@mui/material"
import { FC } from "react"

const Stdout: FC<{ runResult: RunResult | undefined }> = ({ runResult }) => {
  return (
    <>
      {runResult ?
        <>
          <Typography>Stdout:</Typography>
          <Paper
            sx={{ m: 1, p: 1 }}
          >
            <Typography
              sx={{ whiteSpace: 'pre-line' }}
            >
              <code>
                {runResult.stdout}
              </code>
            </Typography>
          </Paper>
        </>
        : null
      }
    </>

  )
}

export default Stdout
