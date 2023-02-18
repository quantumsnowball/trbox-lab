import { Paper, styled, Typography } from '@mui/material'


const ContentDiv = styled('div')`
  /* take all vertical space */
  flex: 1 1 auto;
  /* single item each row */
  display: flex;
  flex-flow: column;
  /* align vertically */
  justify-content: center;
  /* align horizontally */
  align-items: center;
`;

export default function Home() {
  return (
    <ContentDiv>
      <Paper
        sx={{
          width: '100%',
          textAlign: 'center'
        }}>
        <Typography variant='h4'>Welcome to TrBox Console</Typography>
        <Typography variant='h5'>Hello World!</Typography>
        <Typography variant='h5'>This is the all-in-one algo trading dashboard you ever need.</Typography>
      </Paper>
    </ContentDiv>
  )
}
