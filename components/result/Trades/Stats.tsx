import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { FC, PropsWithChildren, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Box } from "@mui/system";
import { useGetStatsQuery } from "@/redux/slices/apiSlice";
import { TradeStats } from "@/redux/slices/apiSlice/types";

const Section: FC<{ title: string } & PropsWithChildren> = ({ title, children }) => {
  return (
    <>
      <Typography
        sx={{
          textAlign: 'center',
          my: 0.5,
        }}
      >
        {title}
      </Typography>
      <Box
        className='flex row start'
        sx={{ flexWrap: 'wrap' }}
      >
        {children}
      </Box>
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

// <Field name='Average trade fees' value='1.3454 USDT' />
const TradeStatsCard: FC<{ title: string, items: TradeStats }> =
  ({ title, items: { count, avg_interval, avg_quantity, avg_value } }) => {
    return (
      <Section title={title}>
        <Field
          name='Total count'
          value={count.toString()}
        />
        <Field
          name='Average interval'
          value={avg_interval ? `${avg_interval.toFixed(2)} days` : '-'}
        />
        <Field
          name='Average quantity'
          value={avg_quantity ? `${avg_quantity.toFixed(4)}` : '-'}
        />
        <Field
          name='Average value'
          value={avg_value ? `${avg_value.toFixed(4)}` : '-'}
        />
      </Section>
    )
  }

// <Section title='Win'>
//   <Field name='Win rate' value='65%' />
//   <Field name='Average duration' value='1.5 days' />
//   <Field name='Average win %' value='+12.05%' />
// </Section>
// <Section title='Loss'>
//   <Field name='Loss rate' value='45%' />
//   <Field name='Average duration' value='2.5 days' />
//   <Field name='Average loss %' value='-5.05%' />
// </Section>

const Stats: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const { data: stats } = useGetStatsQuery({ path, strategy })
  const [expanded, setExpanded] = useState(true)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

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
          Statistics
        </Typography>
      </AccordionSummary>
      {stats ?
        <AccordionDetails
          className='scroll'
          sx={{
            maxHeight: isSmall ? '40vh' : '35vh'
          }}
        >
          <TradeStatsCard title='All' items={stats.all} />
          <TradeStatsCard title='Buys' items={stats.buys} />
          <TradeStatsCard title='Sells' items={stats.sells} />
        </AccordionDetails>
        :
        null
      }
    </Accordion>
  )
}

export default Stats
