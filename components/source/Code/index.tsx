import { useLazyRunSourceQuery } from "@/redux/slices/apiSlice"
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material"
import { FC, useState } from "react"
import Stdout from "./Stdout"
import Viewer from "./Viewer"
import DataObjectIcon from '@mui/icons-material/DataObject';
import TerminalIcon from '@mui/icons-material/Terminal';


const Code: FC<{ path: string }> = ({ path }) => {
  const [trigger, { data: runResult }] = useLazyRunSourceQuery()
  const run = () => trigger(path)
  const [navId, setNavId] = useState(0)

  return (
    <Box
      id='code-div'
      sx={{
        display: 'flex',
        flexFlow: 'column nowrap',
        height: '100%',
        overflow: 'auto',
      }}
    >
      {{
        0: <Viewer {...{ path, run }} />,
        1: <Stdout {...{ runResult }} />,
      }[navId]}
      <BottomNavigation
        showLabels
        value={navId}
        onChange={(_, newNavId) => setNavId(newNavId)}
      >
        <BottomNavigationAction label="Code" icon={<DataObjectIcon />} />
        <BottomNavigationAction label="Output" icon={<TerminalIcon />} />
      </BottomNavigation>
    </Box>
  )
}

export default Code
