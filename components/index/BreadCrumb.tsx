import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FC, useState } from 'react';
import { Breadcrumbs, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { layoutTempActions } from '@/redux/slices/layoutTemp';
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';


const Home = () => {
  const dispatch = useDispatch()
  const clearNodes = () => dispatch(layoutTempActions.clearNodes())

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

const BreadCrumbs = () => {
  const dispatch = useDispatch()
  const dirTree = useSelector((s: RootState) => s.layoutTemp.breadCrumbs.dirTree)
  const [nodes, shortenNodes] = [
    useSelector((s: RootState) => s.layoutTemp.breadCrumbs.nodes),
    (i: number) => () => dispatch(layoutTempActions.shortenNodes(i))
  ]
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const onClickBreadCrumb = (event: React.MouseEvent<HTMLElement>) => {
    setVisible(prev => !prev)
    setAnchor(event.currentTarget)
  }

  const isLastDir = () => {
    const last = nodes.at(-1)
    // at root, must be a dir
    if (!last)
      return true
    // get last node
    const lastNode = dirTree[last]
    // last node is a file
    if (!lastNode)
      return false
    // last node is a dir
    console.debug({ lastNode })
    return true
  }

  const Icon: FC<{ name: string }> = ({ name }) =>
    // if no .py ext, consider a dir
    <>
      {name.endsWith('.py') ?
        <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
        <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
    </>

  return (
    <Breadcrumbs
      // separator={<Sep />}
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
  )
}

export default BreadCrumbs
