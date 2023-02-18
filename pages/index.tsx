import { Paper, styled, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react';


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

type TreeDict = {
  [key: string]: TreeDict | null
}

const LabSummary: FC<{ node: TreeDict }> = ({ node }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        textAlign: 'left',
        m: 1,
        p: 1,
      }}
    >
      {Object.keys(node).map(name => {
        const item = node[name]
        // a dir
        if (item) {
          return (
            <div key={name}>
              <Typography variant='h6'>{name}/</Typography>
              <LabSummary node={item} />
            </div>
          )
        }
        // a st_*.py file
        else {
          return (
            <div key={name}>
              <Typography key={name} variant='h6'>{name}</Typography>
            </div>
          )
        }
      })}
    </Paper>
  )
}

export default function Home() {
  const [dirTree, setDirTree] = useState({} as TreeDict)

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
        <Typography variant='h4'>Labs in CWD</Typography>
        <LabSummary node={dirTree} />
      </Paper>
    </ContentDiv>
  )
}
