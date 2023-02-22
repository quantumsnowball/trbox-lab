import { RunResult } from "@/redux/slices/apiSlice"
import { Box } from "@mui/material"
import { FC } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
// use cjs module instead of esm when using NextJS, important!
// good looking themes you may consider: 
//   gruvboxDark, srcery, railscasts
//   ref: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
import { railscasts as colorScheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const Stdout: FC<{ runResult: RunResult | undefined }> = ({ runResult }) => {
  return (
    <Box
      id='viewer-div'
      sx={{
        display: 'flex',
        flexFlow: 'column nowrap',
        height: '100%',
        overflow: 'auto',
        mx: 1
      }}
    >
      <SyntaxHighlighter
        language='powershell'
        style={colorScheme}
        showLineNumbers={false}
        customStyle={{ fontSize: '1.0em', height: '100%' }}
      >
        {runResult?.stdout ?? ''}
      </SyntaxHighlighter>
    </Box >
  )
}

export default Stdout
