import { Paper, styled, Typography } from '@mui/material'
import { useEffect } from 'react';


const ContentDiv = styled('div')`
  /* take all vertical space */
  flex: 1 1 auto;
  /* single item each row */
  display: flex;
  flex-flow: column;
  /* align vertically */
  justify-content: flex-start;
  /* align horizontally */
  align-items: center;
`;

export default function Home() {
  useEffect(() => {
    const fetchTree = async () => {
      // The /api path is rewritten so that it can fetch to production port, bypass CORS
      const res = await fetch('/api/tree')
      const treeDict = await res.json()
      console.log(treeDict)
    }
    fetchTree().catch(console.error)
  }, [])

  return (
    <ContentDiv>
      <Paper
        sx={{
          width: '100%',
          textAlign: 'center'
        }}>
        <Typography variant='h4'>Directory Tree</Typography>
        <Typography variant='h5'>Hello World!</Typography>
        <Typography variant='h5'>This is the all-in-one backtest lab you ever need.</Typography>
      </Paper>
    </ContentDiv>
  )
}
