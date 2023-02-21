import { styled, Typography } from '@mui/material'


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
      <Typography
        variant='h4'
        sx={{ textAlign: 'center' }}
      >
        Welcom to TrBox Lab
      </Typography>
    </ContentDiv>
  )
}
