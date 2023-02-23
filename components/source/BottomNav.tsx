import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import DataObjectIcon from '@mui/icons-material/DataObject'
import TerminalIcon from '@mui/icons-material/Terminal'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { layoutTempActions } from "@/redux/slices/layoutTemp"


export const SOURCE_BOTTOM_NAVIGATION = ['files', 'source', 'output', 'error',] as const

const BottomNav = () => {
  const dispatch = useDispatch()
  const [id, setId] = [
    useSelector((s: RootState) => s.layoutTemp.source.section),
    (i: number) => dispatch(layoutTempActions.setSourceSection(i)),
  ]

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
