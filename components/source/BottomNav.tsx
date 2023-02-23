import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import DataObjectIcon from '@mui/icons-material/DataObject'
import TerminalIcon from '@mui/icons-material/Terminal'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { useState } from "react"



export const NAVIGATION = {
  'files': 0,
  'source': 1,
  'output': 2,
  'error': 3,
}

const BottomNav = () => {
  const [id, setId] = useState(0)

  return (
    <BottomNavigation
      showLabels
      value={id}
      onChange={(_, newId) => setId(newId)}
    >
      <BottomNavigationAction label="Files" icon={<FormatListBulletedIcon />} />
      <BottomNavigationAction label="Source" icon={<DataObjectIcon />} />
      <BottomNavigationAction label="Output" icon={<TerminalIcon />} />
      <BottomNavigationAction label="Error" icon={<ErrorOutlineOutlinedIcon />} />
    </BottomNavigation>
  )
}

export default BottomNav
