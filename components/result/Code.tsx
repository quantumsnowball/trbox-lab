import { useGetResultSourceQuery } from "@/redux/slices/apiSlice"
import { Box, Typography } from "@mui/material"
import { FC } from "react"
import { FileNode } from "@/common/types"
import SyntaxHighlighter from "react-syntax-highlighter"
// use cjs module instead of esm when using NextJS, important!
// good looking themes you may consider: 
//   gruvboxDark, srcery, railscasts
//   ref: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
import { railscasts as colorScheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { RESULT_DIR_PREFIX } from "./constants"


const Content: FC<{ path: string | undefined }> = ({ path }) => {
  const { data: source } = useGetResultSourceQuery(path ?? '')

  return (
    <SyntaxHighlighter
      language='python'
      style={colorScheme}
      showLineNumbers={false}
      className='expanding'
      customStyle={{ fontSize: '1.0em' }}
    >
      {source ?? ''}
    </SyntaxHighlighter>
  )
}

type Props = {
  nodes: FileNode[]
}

const Code: FC<Props> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const name = lastNode?.name
  const path = lastNode?.path
  console.log({ name, path })

  return (
    <Box
      id='viewer-div'
      className='expanding scroll flex column stretch'
      sx={{ mx: 1 }}
    >
      {
        (name && name.startsWith(RESULT_DIR_PREFIX)) ?
          <Content {...{ path }} />
          :
          <Typography sx={{ textAlign: 'center' }}>
            Display source code copy here
          </Typography>
      }
    </Box >
  )

}

export default Code

