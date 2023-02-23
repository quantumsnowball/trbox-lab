import { useGetSourceQuery, useLazyRunSourceQuery } from "@/redux/slices/apiSlice"
import { layoutActions } from "@/redux/slices/layout"
import { Box, Button } from "@mui/material"
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import { FC } from "react"
import { useDispatch } from "react-redux"
import { Node } from "@/common/types"
import SyntaxHighlighter from "react-syntax-highlighter"
// use cjs module instead of esm when using NextJS, important!
// good looking themes you may consider: 
//   gruvboxDark, srcery, railscasts
//   ref: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
import { railscasts as colorScheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'


const RunButton: FC<{ run: () => void }> = ({ run }) => {
  const dispatch = useDispatch()
  const switchToTerminal = () => dispatch(layoutActions.setSourceSection(1))
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
  nodes: Node[]
}
const Code: FC<Props> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path
  const [trigger, _] = useLazyRunSourceQuery()
  const run = () => { if (path) trigger(path) }

  return (
    <Box
      id='viewer-div'
      className='expanding scroll flex column stretch'
      sx={{ mx: 1 }}
    >
      {path ? <Content path={path} /> : ''}
      <RunButton {...{ run }} />
    </Box >
  )

}

export default Code

