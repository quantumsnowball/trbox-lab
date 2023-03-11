import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Checkbox, ToggleButtonGroup, ToggleButton } from "@mui/material"
import { FC, useState } from "react"
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useGetMarksIndexQuery } from "@/redux/slices/apiSlice"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


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

const Row: FC<{ name: string }> = ({ name }) => {
  const [visible, setVisible] = useState(false)
  return (
    <Box
      className='flex row spread'
    >
      <Box
        className='flex row'
      >
        <Checkbox
          color='success'
          icon={<VisibilityOffOutlinedIcon />}
          checkedIcon={<VisibilityOutlinedIcon />}
          sx={{ mr: 1 }}
          checked={visible}
          onClick={() => setVisible(p => !p)}
        />
        <Typography>
          {name}
        </Typography>
      </Box>
      {visible && <ControlButtons />}
    </Box>
  )
}

const Marks: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const { data: index } = useGetMarksIndexQuery(path)
  const [expanded, setExpanded] = useState(true)

  return (
    <Accordion
      disableGutters
      expanded={expanded}
      onChange={() => setExpanded(prev => !prev)}
    >
      <AccordionSummary
        expandIcon={<ExpandLessIcon />}
      >
        <Typography
          variant='h6'
        >
          Marks
        </Typography>
      </AccordionSummary>
      {index && index[strategy] &&
        <AccordionDetails>
          {
            index[strategy].map(name =>
              <Row key={name} {...{ name }} />
            )
          }
        </AccordionDetails>
      }
    </Accordion >
  )
}

export default Marks

