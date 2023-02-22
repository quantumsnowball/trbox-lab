import { useGetSourceQuery } from "@/redux/slices/apiSlice"
import { Box, Button } from "@mui/material"
import { FC } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
// use cjs module instead of esm when using NextJS, important!
// good looking themes you may consider: 
//   gruvboxDark, srcery, railscasts
//   ref: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
import { railscasts as colorScheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'


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

type Props = {
  path: string
  run: () => void
}
const Viewer: FC<Props> = ({ path, run }) => {
  const { data: source } = useGetSourceQuery(path)
  return (

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
        customStyle={{ fontSize: '1.0em', height: '100%' }}
      >
        {source ?? ''}
      </SyntaxHighlighter>
      <RunButton {...{ run }} />
    </Box >
  )

}

export default Viewer
