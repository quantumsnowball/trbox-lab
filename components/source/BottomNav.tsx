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
import { BottomNavTag, SOURCE_FILE_SUFFIX } from "./constants"


const BottomNav: FC<{ nodes: Node[] }> = ({ nodes }) => {
  const dispatch = useDispatch()
  const [tag, setTag] = [
    useSelector((s: RootState) => s.layoutTemp.source.section),
    (tag: BottomNavTag) => dispatch(layoutTempActions.goToSourceSection(tag)),
  ]
  const lastNode = nodes?.at(-1)
  const notDir = lastNode?.path.endsWith(SOURCE_FILE_SUFFIX)
  const notSource = !lastNode?.path.endsWith(SOURCE_FILE_SUFFIX)

  return (
    <BottomNavigation
      showLabels
      value={tag}
      onChange={(_, newTag) => setTag(newTag)}
    >
      <BottomNavigationAction
        disabled={notDir}
        label="Files"
        value='files'
        icon={<FormatListBulletedIcon />}
      />
      <BottomNavigationAction
        disabled={notSource}
        label="Source"
        value='source'
        icon={<DataObjectIcon />} />
      <BottomNavigationAction
        disabled={notSource}
        label="Output"
        value='output'
        icon={<TerminalIcon />}
      />
      <BottomNavigationAction
        disabled={notSource}
        label="Error"
        value='error'
        icon={<ErrorOutlineOutlinedIcon />}
      />
    </BottomNavigation>
  )
}

export default BottomNav
