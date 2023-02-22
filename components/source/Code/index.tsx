import { useLazyRunSourceQuery } from "@/redux/slices/apiSlice"
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material"
import { FC } from "react"
import Stdout from "./Stdout"
import Viewer from "./Viewer"
import DataObjectIcon from '@mui/icons-material/DataObject';
import TerminalIcon from '@mui/icons-material/Terminal';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { layoutActions } from "@/redux/slices/layout"


const Code: FC<{ path: string }> = ({ path }) => {
  const dispatch = useDispatch()
  const [trigger, { data: runResult }] = useLazyRunSourceQuery()
  const run = () => trigger(path)
  const [sectionId, setSectionId] = [
    useSelector((s: RootState) => s.layout.section.source.sectionId),
    (i: number) => dispatch(layoutActions.setSourceSection(i))
  ]

  return (
    <Box
      id='code-div'
      className='expanding scroll flex column stretch'
    >
      {
        {
          0: <Viewer {...{ path, run }} />,
          1: <Stdout {...{ runResult }} />,
        }[sectionId]
      }
      <BottomNavigation
        showLabels
        value={sectionId}
        onChange={(_, newId) => setSectionId(newId)}
      >
        <BottomNavigationAction label="Code" icon={<DataObjectIcon />} />
        <BottomNavigationAction label="Output" icon={<TerminalIcon />} />
      </BottomNavigation>
    </Box>
  )
}

export default Code
