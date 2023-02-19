import { TreeDict } from '@/common/types';
import BreadCrumbs from '@/components/index/BreadCrumb';
import LabSummary from '@/components/index/LabSummary';
import { layoutTempActions } from '@/redux/slices/layoutTemp';
import { RootState } from '@/redux/store';
import { Paper, styled, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


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
  const [dirTree, setDirTree] = [
    useSelector((s: RootState) => s.layoutTemp.breadCrumbs.dirTree),
    (t: TreeDict) => dispatch(layoutTempActions.setDirTree(t))
  ]


  useEffect(() => {
    const fetchTreeDict = async () => {
      // The /api path is rewritten so that it can fetch to production port, bypass CORS
      const res = await fetch('/api/tree')
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
          textAlign: 'center'
        }}>
        <Typography variant='h5'>Labs</Typography>
        <BreadCrumbs />
        <LabSummary node={dirTree} />
      </Paper>
    </ContentDiv>
  )
}
