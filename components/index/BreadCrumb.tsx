import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { useState } from 'react';
import { Breadcrumbs, Menu, MenuItem, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


const Home = () =>
  <Typography
    variant='h6'
    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
  >
    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
  </Typography>

const BreadCrumbs = () => {
  const dirTree = useSelector((s: RootState) => s.layoutTemp.breadCrumbs.dirTree)
  const nodes = useSelector((s: RootState) => s.layoutTemp.breadCrumbs.nodes)
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
        nodes.map(name => {
          return (
            <Typography
              variant='h6'
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
