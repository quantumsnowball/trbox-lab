import { useRunSourceQueryState } from "@/redux/slices/apiSlice"
import { Box } from "@mui/material"
import { FC } from "react"
import { Node } from "@/common/types"
import SyntaxHighlighter from "react-syntax-highlighter"
// use cjs module instead of esm when using NextJS, important!
// good looking themes you may consider: 
//   gruvboxDark, srcery, railscasts
//   ref: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
import { railscasts as colorScheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'


const Error: FC<{ nodes: Node[] }> = ({ nodes }) => {
  const { data: runResult } = useRunSourceQueryState(nodes?.at(-1)?.path ?? '')

  return (
    <Box
      id='viewer-div'
      className='expanding scroll flex column stretch'
      sx={{ mx: 1 }}
    >
      <SyntaxHighlighter
        language='powershell'
        style={colorScheme}
        showLineNumbers={false}
        customStyle={{ fontSize: '1.0em', flex: 1 }}
      >
        {runResult?.stderr ?? ''}
      </SyntaxHighlighter>
    </Box >
  )
}

export default Error

