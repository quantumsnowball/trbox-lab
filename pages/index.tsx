import { TreeDict } from '@/common/types';
import { styled, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { srcTreeTempActions } from '@/redux/slices/srcTreeTemp';


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
  const dispatch = useDispatch()
  const setDirTree = (t: TreeDict) => dispatch(srcTreeTempActions.setDirTree(t))

  useEffect(() => {
    const fetchTreeDict = async () => {
      // The /api path is rewritten so that it can fetch to production port, bypass CORS
      const res = await fetch('/api/tree/src')
      const treeObj = await res.json()
      setDirTree(treeObj)
    }
    fetchTreeDict().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
