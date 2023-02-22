import { Paper, Typography } from '@mui/material'


export default function Home() {
  return (
    <div
      id='content-div'
      className='full flex-column expanding'
    >
      <Paper
        className='full flex-column expanding'
        sx={{ justifyContent: 'center' }}
      >
        <Typography
          variant='h4'
          sx={{ textAlign: 'center' }}
        >
          Welcom to TrBox Lab
        </Typography>
      </Paper>
    </div>
  )
}
