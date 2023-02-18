import { Breadcrumbs, Paper, styled, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


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

const BreadCrumbsExample = () => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon />}
      aria-label="breadcrumb"
      sx={{ m: 1, p: 1 }}
    >
      <Typography
        variant='h6'
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
      </Typography>
      <Typography
        variant='h6'
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Momentum
      </Typography>
      <Typography
        variant='h6'
        sx={{ display: 'flex', alignItems: 'center' }}
        color="text.primary"
      >
        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        st_demo_sub_2
      </Typography>
    </Breadcrumbs>
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
        <Typography variant='h5'>Labs</Typography>
        <BreadCrumbsExample />
        <LabSummary node={dirTree} />
      </Paper>
    </ContentDiv>
  )
}
