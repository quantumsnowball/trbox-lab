import HomeIcon from '@mui/icons-material/Home';
import { FC, } from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { resultTreeTempActions } from '@/redux/slices/resultTreeTemp';
import FolderIcon from '@mui/icons-material/Folder';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import { UpOneLevelButton } from '../common/buttons';

const PREFIX = '.result'

const Home = () => {
  const dispatch = useDispatch()
  const clearNodes = () => dispatch(resultTreeTempActions.clearNodes())

  return (
    <Typography
      variant='h6'
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      onClick={clearNodes}
    >
      <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    </Typography>
  )
}

const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.startsWith(PREFIX) ?
      <LeaderboardOutlinedIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const BreadCrumbs = () => {
  const dispatch = useDispatch()
  const [nodes, shortenNodes, popNode] = [
    useSelector((s: RootState) => s.resultTreeTemp.nodes),
    (i: number) => () => dispatch(resultTreeTempActions.shortenNodes(i)),
    () => dispatch(resultTreeTempActions.popNode()),
  ]


  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ m: 1, p: 1 }}
      >
        <Home />
        {
          nodes.map((name, i) => {
            return (
              <Typography
                key={name}
                variant='h6'
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={shortenNodes(i + 1)}
              >
                <Icon name={name} />
                {name}
              </Typography>
            )
          })
        }
      </Breadcrumbs >
      {nodes.length > 0 ?
        <UpOneLevelButton onClick={() => popNode()} /> : null
      }
    </Box>
  )
}

export default BreadCrumbs
