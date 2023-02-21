import { RunResult, useGetSourceQuery, useLazyRunSourceQuery } from "@/redux/slices/apiSlice"
import { Box, Button, Paper, Typography } from "@mui/material"
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

const RunButton: FC<{ run: () => void }> = ({ run }) =>
  <Box
    sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
  >
    <Button
      variant="contained"
      onClick={run}
    >
      RUN
    </Button>
  </Box>

const Code: FC<{ path: string }> = ({ path }) => {
  const { data: source } = useGetSourceQuery(path)
  const [trigger, { data: runResult }] = useLazyRunSourceQuery()
  const run = () => trigger(path)

  return (
    <>
      {source ?
        <Box
          sx={{ m: 1, p: 1 }}
        >
          <Typography
            variant='body2'
            sx={{ whiteSpace: 'pre', fontFamily: 'monospace', userSelect: 'text' }}
          >
            {source}
          </Typography>
          <RunButton {...{ run }} />
          <Stdout {...{ runResult }} />
        </Box >
        : null
      }
    </>
  )
}

export default Code
