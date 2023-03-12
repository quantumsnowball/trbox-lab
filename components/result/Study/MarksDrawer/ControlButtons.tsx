import { layoutTempActions } from "@/redux/slices/layoutTemp"
import { RootState } from "@/redux/store"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"


export type StudyPlotMode = 'main' | 'sub' | null

const ControlButtons: FC<{ path: string, strategy: string, name: string }> = ({ path, strategy, name }) => {
  const dispatch = useDispatch()
  const studyMode = useSelector((s: RootState) => s.layoutTemp.result.study.mode[path]?.[strategy]?.[name] ?? null)
  const setStudyMode = (m: StudyPlotMode) => dispatch(layoutTempActions.setStudyMode({ path, strategy, name, mode: m }))
  return (
    <ToggleButtonGroup
      size='small'
      exclusive
      value={studyMode}
      onChange={(_e, value) => setStudyMode(value)}
    >
      <ToggleButton value='main'>
        Main
      </ToggleButton>
      <ToggleButton value='sub'>
        Sub
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ControlButtons
