import { useRunSourceQueryState } from "@/redux/slices/apiSlice"
import { Box } from "@mui/material"
import { FC } from "react"
import { FileNode } from "@/common/types"
import SyntaxHighlighter from "react-syntax-highlighter"
// use cjs module instead of esm when using NextJS, important!
// good looking themes you may consider: 
//   gruvboxDark, srcery, railscasts
//   ref: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
import { railscasts as colorScheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'


const Output: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const { data: lines } = useRunSourceQueryState(nodes?.at(-1)?.path ?? '')

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
        {
          lines ?
            lines
              .filter(l => l.type === 'stdout')
              .map(l => l.text).join('')
            :
            ''
        }
      </SyntaxHighlighter>
    </Box >
  )
}

export default Output
