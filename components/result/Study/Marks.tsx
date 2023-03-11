import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Checkbox } from "@mui/material"
import { FC, useState } from "react"
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useGetMarksIndexQuery } from "@/redux/slices/apiSlice"


const Row: FC<{ name: string }> = ({ name }) => {
  return (
    <Box
      className='flex row spread'
    >
      <Typography>
        {name}
      </Typography>
      <Checkbox
        color='success'
      />
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

