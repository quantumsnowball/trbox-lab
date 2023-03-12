import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { FC, useState } from "react"


type PlotChoices = 'main' | 'sub'

const ControlButtons: FC = () => {
  const [selection, setSelection] = useState<PlotChoices>('main')
  return (
    <ToggleButtonGroup
      size='small'
      exclusive
      value={selection}
      onChange={(_e, value) => value && setSelection(value)}
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
