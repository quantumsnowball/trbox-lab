import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import DataObjectIcon from '@mui/icons-material/DataObject'
import TerminalIcon from '@mui/icons-material/Terminal'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { layoutTempActions } from "@/redux/slices/layoutTemp"
import { Node } from '@/common/types'
import { FC } from "react"
import { SOURCE_FILE_SUFFIX } from "./constants"


const BottomNav: FC<{ nodes: Node[] }> = ({ nodes }) => {
  const dispatch = useDispatch()
  const [id, setId] = [
    useSelector((s: RootState) => s.layoutTemp.source.section),
    (i: number) => dispatch(layoutTempActions.setSourceSection(i)),
  ]
  const lastNode = nodes?.at(-1)
  const notDir = lastNode?.path.endsWith(SOURCE_FILE_SUFFIX)
  const notSource = !lastNode?.path.endsWith(SOURCE_FILE_SUFFIX)

  return (
    <BottomNavigation
      showLabels
      value={id}
      onChange={(_, newId) => setId(newId)}
    >
      <BottomNavigationAction
        disabled={notDir}
        label="Files"
        icon={<FormatListBulletedIcon />}
      />
      <BottomNavigationAction
        disabled={notSource}
        label="Source"
        icon={<DataObjectIcon />} />
      <BottomNavigationAction
        disabled={notSource}
        label="Output"
        icon={<TerminalIcon />}
      />
      <BottomNavigationAction
        disabled={notSource}
        label="Error"
        icon={<ErrorOutlineOutlinedIcon />}
      />
    </BottomNavigation>
  )
}

export default BottomNav
