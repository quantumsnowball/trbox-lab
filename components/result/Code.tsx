import { useGetSourceQuery, useLazyRunSourceQuery } from "@/redux/slices/apiSlice"
import { Box, Button, Typography } from "@mui/material"
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import { FC } from "react"
import { useDispatch } from "react-redux"
import { FileNode } from "@/common/types"
import SyntaxHighlighter from "react-syntax-highlighter"
// use cjs module instead of esm when using NextJS, important!
// good looking themes you may consider: 
//   gruvboxDark, srcery, railscasts
//   ref: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
import { railscasts as colorScheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { SOURCE_FILE_SUFFIX } from "./constants"
import { layoutTempActions } from "@/redux/slices/layoutTemp"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"


const Content: FC<{ path: string }> = ({ path }) => {
  // const { data: source } = useGetSourceQuery(path)
  return (
    <SyntaxHighlighter
      language='python'
      style={colorScheme}
      showLineNumbers={false}
      className='expanding'
      customStyle={{ fontSize: '1.0em' }}
    >
      {/* source ?? '' */}
      Source code copy here
    </SyntaxHighlighter>
  )
}

type Props = {
  nodes: FileNode[]
}

const Code: FC<Props> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path

  return (
    <Box
      id='viewer-div'
      className='expanding scroll flex column stretch'
      sx={{ mx: 1 }}
    >
      {
        (path && path.endsWith(SOURCE_FILE_SUFFIX)) ?
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

