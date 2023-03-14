import { StudyPlotMode } from "@/redux/slices/content"
import { layoutTempActions } from "@/redux/slices/layoutTemp"
import { RootState } from "@/redux/store"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"



const ControlButtons: FC<{ path: string, strategy: string, name: string }> = ({ path, strategy, name }) => {
  const dispatch = useDispatch()
  const studyMode: StudyPlotMode = useSelector((s: RootState) => s.layoutTemp.result.study.mode[path]?.[strategy]?.[name] ?? null)
  const setStudyMode = (m: StudyPlotMode) => dispatch(layoutTempActions.setStudyMode({ path, strategy, name, mode: m }))
  const existingMainSeriesNames = useSelector((s: RootState) => Object.keys(s.content.result.study.series[path]?.[strategy]?.main ?? {}) ?? [])

  return (
    <ToggleButtonGroup
      size='small'
      exclusive
      value={studyMode}
      onChange={(_e, value) => {
        // entering overlay
        if (value === 'overlay' && studyMode !== 'overlay') {
          console.log(`select first from ${existingMainSeriesNames.join(', ')}`)
          setStudyMode(value)
          return
        }
        // double clicking overlay
        if (value === null && studyMode === 'overlay') {
          // if there is next main series, stay in overlay
          console.log(`select next from ${existingMainSeriesNames.join(', ')}`)
          // else, go to null
          // TODO
          return
        }
        // other mode
        setStudyMode(value)
      }}
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
