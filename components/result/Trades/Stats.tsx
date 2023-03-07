import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from "@mui/material";
import { useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess'


const Stats = () => {
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
        <Typography>
          Statistics
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Trade stats details
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default Stats
