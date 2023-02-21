import { RunResult, useGetSourceQuery, useLazyRunSourceQuery } from "@/redux/slices/apiSlice"
import { Box, Button, Paper, Typography } from "@mui/material"
import { FC } from "react"
import SyntaxHighlighter from 'react-syntax-highlighter'
// use cjs module instead of esm when using NextJS, important!
// good looking themes you may consider: 
//   gruvboxDark, srcery, railscasts
//   ref: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
import { railscasts as colorScheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

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
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      pt: 1, pb: 2,
    }}
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
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            height: '100%',
            overflow: 'auto',
            mx: 1
          }}
        >
          <SyntaxHighlighter
            language='python'
            style={colorScheme}
            showLineNumbers={false}
            customStyle={{ fontSize: '1.0em' }}
          >
            {source}
          </SyntaxHighlighter>
          <RunButton {...{ run }} />
          <Stdout {...{ runResult }} />
        </Box >
        : null
      }
    </>
  )
}

export default Code
