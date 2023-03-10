import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { FC, useState } from "react"
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const Marks: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
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
      <AccordionDetails>
        Pick your marks here
      </AccordionDetails>
    </Accordion >
  )
}

export default Marks

