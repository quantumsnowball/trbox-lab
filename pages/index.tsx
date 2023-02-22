import { Paper, Typography } from '@mui/material'


export default function Home() {
  return (
    <div
      id='content-div'
      className='full flex column'
    >
      <Paper
        className='full flex column'
      >
        <Typography
          variant='h4'
        >
          Welcom to TrBox Lab
        </Typography>
      </Paper>
    </div>
  )
}
