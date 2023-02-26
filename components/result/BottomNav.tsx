import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined'
import TimelineIcon from '@mui/icons-material/Timeline'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import DataObjectIcon from '@mui/icons-material/DataObject'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { layoutTempActions } from "@/redux/slices/layoutTemp"
import { FileNode } from '@/common/types'
import { FC } from "react"
import { ResultBottomNavTag, RESULT_DIR_PREFIX, RESULT_ROOT } from "./constants"
import { useRouter } from "next/router"


const BottomNav: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [tag, setTag] = [
    useSelector((s: RootState) => s.layoutTemp.result.section),
    (tag: ResultBottomNavTag) => dispatch(layoutTempActions.goToResultSection(tag)),
  ]
  const lastNode = nodes?.at(-1)
  const isResult = lastNode?.name.startsWith(RESULT_DIR_PREFIX)

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
            router.push(`${RESULT_ROOT}${nodes?.at(-2)?.path}`)
        }}
      />
      <BottomNavigationAction
        disabled={!isResult}
        label="Source"
        value='source'
        icon={isResult ? <DataObjectIcon /> : null}
      />
      <BottomNavigationAction
        disabled={!isResult}
        label="Metrics"
        value='metrics'
        icon={isResult ? <LeaderboardOutlinedIcon /> : null}
      />
      <BottomNavigationAction
        disabled={!isResult}
        label="Equity"
        value='equity'
        icon={isResult ? <TimelineIcon /> : null}
      />
      <BottomNavigationAction
        disabled={!isResult}
        label="Trades"
        value='trades'
        icon={isResult ? <ReceiptLongOutlinedIcon /> : null}
      />
    </BottomNavigation>
  )
}

export default BottomNav
