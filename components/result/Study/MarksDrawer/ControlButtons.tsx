import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { FC, useState } from "react"

const ControlButtons: FC = () => {
  const [selection, setSelection] = useState<'main' | 'overlay'>('main')
  return (
    <ToggleButtonGroup
      size='small'
      exclusive
      value={selection}
      onChange={(_e, value) => setSelection(value)}
    >
      <ToggleButton value='main'>
        Main
      </ToggleButton>
      <ToggleButton value='overlay'>
        Overlay
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ControlButtons
