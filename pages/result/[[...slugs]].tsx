import { Paper, styled, Typography } from '@mui/material'


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
