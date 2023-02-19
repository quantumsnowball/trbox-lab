import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { useState } from 'react';
import { Breadcrumbs, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { layoutTempActions } from '@/redux/slices/layoutTemp';


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

  return (
    <Breadcrumbs
      // separator={<NavigateNextIcon />}
      aria-label="breadcrumb"
      sx={{ m: 1, p: 1 }}
    >
      <Home />
      {
        nodes.map((name, i) => {
          return (
            <Typography
              variant='h6'
              sx={{ cursor: 'pointer' }}
              onClick={shortenNodes(i + 1)}
            >
              {name}
            </Typography>
          )
        })
      }
    </Breadcrumbs >
  )
}

export default BreadCrumbs
