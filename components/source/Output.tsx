import { useRunSourceQueryState } from "@/redux/slices/apiSlice"
import { Box, Button } from "@mui/material"
import { FC } from "react"
import { FileNode } from "@/common/types"
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined'
import SyntaxHighlighter from "react-syntax-highlighter"
// use cjs module instead of esm when using NextJS, important!
// good looking themes you may consider: 
//   gruvboxDark, srcery, railscasts
//   ref: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
import { railscasts as colorScheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { ws } from '@/redux/slices/apiSlice'


const StopButton: FC<{ path: string | undefined }> = ({ path }) => {
  return (
    <Box
      className='flex'
      sx={{ pt: 1, pb: 2, }}
    >
      <Button
        variant='text'
        size='large'
        color='error'
        startIcon={<StopCircleOutlinedIcon />}
        onClick={() => {
          if (path && ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({
              type: 'system',
              text: 'stop'
            }))
          }
        }}
      >
        Stop
      </Button>
    </Box>
  )
}

const Output: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const { data: lines } = useRunSourceQueryState(nodes?.at(-1)?.path ?? '')
  const path = nodes?.at(-1)?.path

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
      <StopButton {...{ path }} />
    </Box >
  )
}

export default Output
