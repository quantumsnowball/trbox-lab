import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import DataObjectIcon from '@mui/icons-material/DataObject'
import TerminalIcon from '@mui/icons-material/Terminal'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { layoutTempActions } from "@/redux/slices/layoutTemp"
import { FileNode } from '@/common/types'
import { FC } from "react"
import { SourceBottomNavTag, SOURCE_FILE_SUFFIX, SOURCE_ROOT } from "./constants"
import { useRouter } from "next/router"


const BottomNav: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [tag, setTag] = [
    useSelector((s: RootState) => s.layoutTemp.source.section),
    (tag: SourceBottomNavTag) => dispatch(layoutTempActions.goToSourceSection(tag)),
  ]
  const lastNode = nodes?.at(-1)
  const notSource = !lastNode?.path.endsWith(SOURCE_FILE_SUFFIX)

  return (
    <BottomNavigation
      value={tag}
      onChange={(_, newTag) => setTag(newTag)}
    >
      <BottomNavigationAction
        label="Files"
        value='files'
        icon={<FormatListBulletedIcon />}
        onClick={() => {
          if (nodes?.at(-2))
            router.push(`${SOURCE_ROOT}${nodes?.at(-2)?.path}`)
        }}
      />
      <BottomNavigationAction
        disabled={notSource}
        label="Source"
        value='source'
        icon={notSource ? null : <DataObjectIcon />} />
      <BottomNavigationAction
        disabled={notSource}
        label="Output"
        value='output'
        icon={notSource ? null : <TerminalIcon />}
      />
      <BottomNavigationAction
        disabled={notSource}
        label="Error"
        value='error'
        icon={notSource ? null : <ErrorOutlineOutlinedIcon />}
      />
    </BottomNavigation>
  )
}

export default BottomNav
