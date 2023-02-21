import { useGetSourceQuery, useLazyRunSourceQuery } from "@/redux/slices/apiSlice"
import { Box, Button, Paper, Typography } from "@mui/material"
import { FC } from "react"


const Code: FC<{ path: string }> = ({ path }) => {
  const { data: source } = useGetSourceQuery(path)
  const [trigger, { data: runResult }] = useLazyRunSourceQuery()

  return (
    <>
      {source ?
        <Box
          sx={{ m: 1, p: 1 }}
        >
          <Typography
            sx={{ whiteSpace: 'pre-line' }}
          >
            <code>
              {source.code}
            </code>
          </Typography>
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              onClick={() => trigger(path)}
            >
              RUN
            </Button>
          </Box>
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
        </Box >
        : null
      }
    </>
  )
}

export default Code
