import { StudyPlotMode } from "@/redux/slices/content"
import { layoutTempActions } from "@/redux/slices/layoutTemp"
import { RootState } from "@/redux/store"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"



const ControlButtons: FC<{ path: string, strategy: string, name: string }> = ({ path, strategy, name }) => {
  const dispatch = useDispatch()
  const studyMode: StudyPlotMode = useSelector((s: RootState) => s.layoutTemp.result.study.mode[path]?.[strategy]?.[name] ?? null)
  const setStudyMode = (m: StudyPlotMode) => dispatch(layoutTempActions.setStudyMode({ path, strategy, name, mode: m }))
  return (
    <ToggleButtonGroup
      size='small'
      exclusive
      value={studyMode}
      onChange={(_e, value) => setStudyMode(value)}
    >
      <ToggleButton value='main' sx={{ textTransform: 'none' }}>
        Main
      </ToggleButton>
      <ToggleButton value='sub1' sx={{ textTransform: 'none' }}>
        Sub1
      </ToggleButton>
      <ToggleButton value='sub2' sx={{ textTransform: 'none' }}>
        Sub2
      </ToggleButton>
      <ToggleButton value='overlay' sx={{ textTransform: 'none' }}>
        Overlay
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ControlButtons
