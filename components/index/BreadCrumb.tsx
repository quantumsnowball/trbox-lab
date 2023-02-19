import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { useState } from 'react';
import { Breadcrumbs, Menu, MenuItem, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

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
      <Typography
        variant='h6'
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
      </Typography>
      <Typography
        variant='h6'
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Momentum
      </Typography>
      <Typography
        variant='h6'
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        color="text.primary"
        onClick={onClickBreadCrumb}
      >
        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        st_demo_sub_2
        <Menu
          id="lock-menu"
          anchorEl={anchor}
          open={visible}
          // onClose={() => setVisible(false)}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
        >
          {options.map((option, _) => (
            <MenuItem
              key={option}
            // disabled={index === 0}
            // selected={index === selectedIndex}
            // onClick={() => setVisible(false)}
            // onClick={() => alert('close soon')}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Typography>
    </Breadcrumbs >
  )
}

export default BreadCrumbs
