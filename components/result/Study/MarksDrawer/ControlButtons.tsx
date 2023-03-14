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
  const [overlayId, setOverlayId] = useState(0)

  return (
    <ToggleButtonGroup
      size='small'
      exclusive
      value={studyMode}
      onChange={(_e, value) => {
        // when entering overlay
        if (value === 'overlay' && studyMode !== 'overlay') {
          // TODO
          console.log({ overlay: existingMainSeriesNames[overlayId] })
          setOverlayId(v => v + 1)
        }
        // when double clicking overlay
        else if (value === null && studyMode === 'overlay') {
          // if there is next main series, stay in overlay
          if (overlayId < existingMainSeriesNames.length) {
            // TODO
            console.log({ overlay: existingMainSeriesNames[overlayId] })
            setOverlayId(overlayId + 1)
            // skip setStudyMode, remain in overlay
            return
          }
          // else, go to null
          else {
            // TODO
            console.log({ overlay: null })
            setOverlayId(0)
          }
        }
        // default action
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
