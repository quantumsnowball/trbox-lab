import BreadCrumbs from '@/components/index/BreadCrumb';
import { TreeDict } from '@/common/types';
import Summary from '@/components/index/Summary';
import { Paper, styled } from '@mui/material'
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
  justify-content: flex-start;
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
  }, [])

  return (
    <ContentDiv>
      <Paper
        sx={{
          width: '100%',
        }}>
        <BreadCrumbs />
        <Summary />
      </Paper>
    </ContentDiv>
  )
}
