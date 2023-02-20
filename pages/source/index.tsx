import { TreeDict } from '@/common/types';
import { Paper, styled } from '@mui/material'
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

export default function Source() {
  const [dirTree, setDirTree] = useState({} as TreeDict)

  useEffect(() => {
    const fetchTreeDict = async () => {
      // The /api path is rewritten so that it can fetch to production port, bypass CORS
      const res = await fetch('/api/tree/source')
      const treeObj = await res.json()
      setDirTree(treeObj)
    }
    fetchTreeDict().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
