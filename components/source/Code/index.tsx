import { RunResult, useGetSourceQuery, useLazyRunSourceQuery } from "@/redux/slices/apiSlice"
import { Box, Button, Paper, Typography } from "@mui/material"
import { FC } from "react"
import Viewer from "./Viewer"

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

const Code: FC<{ path: string }> = ({ path }) => {
  const [trigger, { data: runResult }] = useLazyRunSourceQuery()
  const run = () => trigger(path)

  return (
    <>
      <Viewer {...{ path, run }} />
      {/*<Stdout {...{ runResult }} />*/}
    </>
  )
}

export default Code
