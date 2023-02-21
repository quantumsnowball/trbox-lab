import { Node } from '@/common/types';
import { useGetSourceTreeQuery } from '@/redux/slices/apiSlice';
import { Paper, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


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
  const router = useRouter()
  const { slugs } = router.query
  const [nodes, setNodes] = useState([] as Node[])

  useEffect(() => {
    // node not fetched
    if (!rootNode)
      return
    // at root
    if (!slugs || !Array.isArray(slugs)) {
      setNodes([rootNode,])
      return
    }
    console.debug(nodes)


  }, [slugs, rootNode])
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
