import HomeIcon from '@mui/icons-material/Home';
import { FC, } from 'react';
import { Box, Breadcrumbs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { resultTreeTempActions } from '@/redux/slices/resultTreeTemp';
import FolderIcon from '@mui/icons-material/Folder';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import { UpOneLevelButton } from '../common/buttons';
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const [nodes, shortenNodes, popNode] = [
    useSelector((s: RootState) => s.resultTreeTemp.nodes),
    (i: number) => () => dispatch(resultTreeTempActions.shortenNodes(i)),
    () => dispatch(resultTreeTempActions.popNode()),
  ]
  const theme = useTheme()
  const isBig = useMediaQuery(theme.breakpoints.up('sm'))


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
                onClick={() => {
                  shortenNodes(i + 1)
                  if (window.location.pathname !== '/result')
                    router.push('/result')
                }}
              >
                <Icon name={name} />
                {name}
              </Typography>
            )
          })
        }
      </Breadcrumbs >
      {(isBig && nodes.length > 0) ?
        <UpOneLevelButton
          onClick={() => {
            popNode()
            if (window.location.pathname !== '/result')
              router.push('/result')
          }} /> : null
      }
    </Box>
  )
}

export default BreadCrumbs
