import { useGetSourceTreeQuery } from '@/redux/slices/apiSlice';
import { Paper, styled } from '@mui/material'
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

export default function Source() {
  const { data: dirTree } = useGetSourceTreeQuery()

  useEffect(() => {
    console.debug({ dirTree })
    const currentPath = window.location.pathname
    console.debug({ currentPath })

  }, [dirTree])

  return (
    <ContentDiv>
      <Paper
        sx={{
          width: '100%',
        }}>
      </Paper>
    </ContentDiv>
  )
}
