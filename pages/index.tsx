import { Paper, Typography } from '@mui/material'


export default function Home() {
  return (
    <div
      id='content-div'
      className='full expanding flex column'
    >
      <Paper
        className='full expanding flex column'
        sx={{ justifyContent: 'center' }}
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
