import {
  IconButton,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme,
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { themeActions } from '@/redux/slices/theme'
import { useDispatch } from 'react-redux'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'


export const MenuTitle = (
  { title }:
    { title: string }
) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  return (
    <List>
      <ListItem>
        <ListItemText primary={title} />
        <IconButton
          color='inherit'
          onClick={e => {
            dispatch(themeActions.toggleMode())
            e.stopPropagation()
          }}>
          {theme.palette.mode === 'light' ?
            <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </ListItem>
    </List>
  )
}

export const MenuLabel = (
  { icon, label, level = 0, primaryTypographyProps }:
    { icon: JSX.Element, label: string, level?: number, primaryTypographyProps?: object }
) =>
  <ListItem key={label} disablePadding sx={{ paddingLeft: 2 + level * 2 }}>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={label} primaryTypographyProps={primaryTypographyProps} />
  </ListItem>

export const MenuButton = (
  { icon, text, onClick, level = 0 }:
    { icon: JSX.Element, text: string, onClick?: React.MouseEventHandler<HTMLDivElement> | undefined, level?: number }
) =>
  <ListItem key={text} disablePadding>
    <ListItemButton onClick={onClick} sx={{ paddingLeft: 2 + level * 2 }}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem >

export const MenuButtonGrouper = (
  { icon, text, open, toggle }:
    { icon: JSX.Element, text: string, open: boolean, toggle: () => void }
) =>
  <ListItem key={text} disablePadding>
    <ListItemButton onClick={e => {
      e.stopPropagation()
      toggle()
    }}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
  </ListItem>
