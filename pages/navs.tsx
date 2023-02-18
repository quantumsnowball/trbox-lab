import LiveChart from '@/components/navs/LiveChart'
import TitleSection from '@/components/navs/Title'
import { Paper } from '@mui/material'


export default function Navs() {
  return (
    <Paper
      sx={{
        width: '100%',
        textAlign: 'center'
      }}>
      <TitleSection />
      <LiveChart />
    </Paper>
  )
}

