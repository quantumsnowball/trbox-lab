import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined'
import TimelineIcon from '@mui/icons-material/Timeline'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined'
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
        sx={{ minWidth: 0 }}
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
        sx={{ minWidth: 0 }}
        icon={isResult ? <DataObjectIcon /> : null}
      />
      <BottomNavigationAction
        disabled={!isResult}
        label="Metrics"
        value='metrics'
        sx={{ minWidth: 0 }}
        icon={isResult ? <LeaderboardOutlinedIcon /> : null}
      />
      <BottomNavigationAction
        disabled={!isResult}
        label="Equity"
        value='equity'
        sx={{ minWidth: 0 }}
        icon={isResult ? <TimelineIcon /> : null}
      />
      <BottomNavigationAction
        disabled={!isResult}
        label="Study"
        value='study'
        sx={{ minWidth: 0 }}
        icon={isResult ? <ScienceOutlinedIcon /> : null}
      />
      <BottomNavigationAction
        disabled={!isResult}
        label="Trades"
        value='trades'
        sx={{ minWidth: 0 }}
        icon={isResult ? <ReceiptLongOutlinedIcon /> : null}
      />
    </BottomNavigation>
  )
}

export default BottomNav

