import { useGetSourceTreeQuery } from '@/redux/slices/apiSlice';
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


const Result = () => {
  const { data: rootNode } = useGetSourceTreeQuery()
  useEffect(() => {
  console.debug({rootNode})


  }, [rootNode])
  return (
    <ContentDiv>
      <Paper
        sx={{
          width: '100%',
        }}>
        <Typography>
          Hello Result
        </Typography>
      </Paper>
    </ContentDiv>
  )
}

export default Result
