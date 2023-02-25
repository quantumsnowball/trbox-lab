import { AppBar, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import Link from "next/link"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuDrawer from "./MenuDrawer";
import { useDispatch } from "react-redux";
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { APP_TITLE } from "@/common/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useRouter } from "next/router";


const AppTitle = () =>
  <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
    <Link href='/'>
      {APP_TITLE}
    </Link>
  </Typography>

const MenuButton = () => {
  const dispatch = useDispatch()
  const toggle = () => dispatch(layoutTempActions.toggleMenu())
  return (
    <IconButton
      color="inherit"
      aria-label="menu"
      onClick={toggle}
    >
      <MenuIcon />
    </IconButton>
  )
}

const PageLinks = () => {
  const lastSourcePath = useSelector((s: RootState) => s.layout.lastPath.source)
  const lastResultPath = useSelector((s: RootState) => s.layout.lastPath.result)

  const PageLink = ({ title, href }: { title: string, href: string }) =>
    <Typography
      variant='h6'
      sx={{
        mx: 1
      }}
    >
      <Link href={href}>{title}</Link>
    </Typography>

  return (
    <>
      <PageLink title='Home' href='/' />
      <PageLink title='Source' href={`/source${lastSourcePath}`} />
      <PageLink title='Result' href={`/result${lastResultPath}`} />
    </>
  )
}

const PageTabs = () => {
  const lastSourcePath = useSelector((s: RootState) => s.layout.lastPath.source)
  const lastResultPath = useSelector((s: RootState) => s.layout.lastPath.result)
  const [tabId, setTabId] = useState(0)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()

  return (
    <Tabs
      variant={isSmall ? 'fullWidth' : undefined}
      className={isSmall ? 'expanding' : ''}
      indicatorColor='secondary'
      textColor='inherit'
      value={tabId}
      onChange={(_, newId) => setTabId(newId)}
    >
      <Tab label='Home' onClick={() => router.push('/')} />
      <Tab label='Source' onClick={() => router.push(`/source${lastSourcePath}`)} />
      <Tab label='Result' onClick={() => router.push(`/result${lastResultPath}`)} />
    </Tabs>
  )
}

const MenuBar = () => {
  return (
    <>
      <AppBar
        id='appbar-div'
        className='expanding flex row spread'
        sx={{ width: '100%' }}
        position="static"
      >
        <Toolbar
          id='toolbar-div'
          className='expanding flex row spread'
          sx={{ p: 1 }}
        >
          <MenuButton />
          <PageTabs />
        </Toolbar>
      </AppBar>
      <MenuDrawer />
    </>
  )
}

export default MenuBar
