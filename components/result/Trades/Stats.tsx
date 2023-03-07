import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { FC, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Box } from "@mui/system";

const Column = () => {
  return (
    <>
    </>
  )
}
const Field: FC<{ name: string, value: string }> = ({ name, value }) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <TextField
      variant='standard'
      margin={isSmall ? 'none' : 'normal'}
      label={name}
      value={value}
      InputProps={{ readOnly: true, }}
      sx={{
        flexBasis: isSmall ? '50%' : '25%',
        mt: isSmall ? 0.5 : 0,
      }}
    />
  )
}

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
        <Box
          className='flex row start'
          sx={{ flexWrap: 'wrap' }}
        >
          <Field name='Trade count' value='20' />
          <Field name='Average trade interval' value='3.02 days' />
          <Field name='Average trade quantity' value='$200.3454' />
          <Field name='Average trade value' value='200.3454 USDT' />
          <Field name='Win rate' value='65%' />
          <Field name='Average win %' value='+12.05%' />
          <Field name='Average loss %' value='-5.05%' />
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default Stats
