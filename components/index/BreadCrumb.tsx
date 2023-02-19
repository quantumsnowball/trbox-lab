import HomeIcon from '@mui/icons-material/Home';
import { FC, } from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { srcTreeTempActions } from '@/redux/slices/srcTreeTemp';
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { UpOneLevelButton } from '../common/buttons';


const SUFFIX = '.py'

const Home = () => {
  const dispatch = useDispatch()
  const clearNodes = () => dispatch(srcTreeTempActions.clearNodes())

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
    {name.endsWith(SUFFIX) ?
      <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const BreadCrumbs = () => {
  const dispatch = useDispatch()
  const [nodes, shortenNodes, popNode] = [
    useSelector((s: RootState) => s.srcTreeTemp.nodes),
    (i: number) => () => dispatch(srcTreeTempActions.shortenNodes(i)),
    () => dispatch(srcTreeTempActions.popNode()),
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
