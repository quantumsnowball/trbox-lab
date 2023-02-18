import { Button, Paper, styled, Typography } from '@mui/material'
import TradeLogTable from '@/components/tradelog/table';
import { useDispatch } from 'react-redux';
import { contentTempActions } from '@/redux/slices/contentTemp';
import { FC } from 'react';


const ContentDiv = styled('div')`
  /* take all vertical space */
  flex: 1 1 auto;
  /* single item each row */
  display: flex;
  flex-flow: column nowrap;
  /* align vertically */
  justify-content: flex-start;
  /* align horizontally */
  align-items: center;

  overflow: auto;
`;

const Title: FC<{ title: string }> = ({ title }) =>
  <Paper
    sx={{
      width: '100%',
      textAlign: 'center'
    }}>
    <Typography variant='h5'>{title}</Typography>
  </Paper>


export default function TradeLog() {
  const dispatch = useDispatch()
  const clearTradeLog = () => dispatch(contentTempActions.clearTradeLog())
  return (
    <ContentDiv id='content-div'>
      <Title title='Trade Log' />
      <Button
        variant='contained'
        onClick={clearTradeLog}
      >
        Clear
      </Button>
      <TradeLogTable />
    </ContentDiv>
  )
}


