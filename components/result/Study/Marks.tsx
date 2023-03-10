import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { FC, useState } from "react"
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useGetMarksIndexQuery } from "@/redux/slices/apiSlice"

const Marks: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const { data: index } = useGetMarksIndexQuery(path)
  const names = index ? index[strategy] : []
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
        {
          names.map(name =>
            <Typography
              key={name}
            >
              {name}
            </Typography>
          )
        }
      </AccordionDetails>
    </Accordion >
  )
}

export default Marks

