import { List, Collapse } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { layoutActions } from '../../../redux/slices/layout'
import { MenuButtonGrouper, MenuButton } from './common'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import HomeIcon from '@mui/icons-material/Home'
import { useRouter } from 'next/router'
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined'


function PagesMenu() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [state, toggle] = [
    useSelector((s: RootState) => s.layout.menuDrawer.pages.expanded),
    () => dispatch(layoutActions.togglePages())
  ]

  return (
    <>
      <MenuButtonGrouper
        icon={<AccountTreeIcon />}
        text='Pages'
        open={state}
        toggle={toggle}
      />
      <Collapse in={state} timeout="auto" unmountOnExit>
        <List>
          <MenuButton
            icon={<HomeIcon />}
            text='Home'
            onClick={() => router.push('/')}
            level={1}
          />
          <MenuButton
            icon={<LeaderboardOutlinedIcon />}
            text='Result'
            onClick={() => router.push('/result')}
            level={1}
          />
        </List>
      </Collapse>
    </>
  )
}

export default PagesMenu

