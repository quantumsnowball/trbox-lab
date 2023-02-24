import { useGetSourceQuery, useLazyRunSourceQuery, useLazyTestWSQuery } from "@/redux/slices/apiSlice"
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


const RunButton: FC<{ run: () => void }> = ({ run }) => {
  const dispatch = useDispatch()
  const switchToTerminal = () => dispatch(layoutTempActions.goToSourceSection('output'))

  return (
    <Box
      className='flex'
      sx={{ pt: 1, pb: 2, }}
    >
      <Button
        variant='text'
        size='large'
        startIcon={<PlayCircleOutlinedIcon />}
        onClick={() => {
          run()
          switchToTerminal()
        }}
      >
        Run
      </Button>
    </Box>
  )
}

const Content: FC<{ path: string }> = ({ path }) => {
  const { data: source } = useGetSourceQuery(path)
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
  const path = lastNode?.path
  const [trigger, _] = useLazyRunSourceQuery()
  const [testWSNow,] = useLazyTestWSQuery()
  const run = () => { if (path) trigger(path) }

  return (
    <Box
      id='viewer-div'
      className='expanding scroll flex column stretch'
      sx={{ mx: 1 }}
    >
      {
        (path && path.endsWith(SOURCE_FILE_SUFFIX)) ?
          <>
            <Content path={path} />
            <RunButton {...{ run }} />
            <Button
              onClick={() => {
                testWSNow()
                // const socket = new WebSocket(`ws://${window.location.hostname}/api/ws`)
                // console.log('ws')
                // socket.addEventListener('open', () => {
                //   socket.send('TradeLogHistoryRequest')
                // })
                // fetch('/api/ws').then(() => console.debug('ws connected'))
              }}
            >WS</Button>
          </>
          :
          <Typography sx={{ textAlign: 'center' }}>
            Please select a python source file to run
          </Typography>
      }
    </Box >
  )

}

export default Code

