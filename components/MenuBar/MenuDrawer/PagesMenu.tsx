import { List, Collapse } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { layoutActions } from '../../../redux/slices/layout'
import { MenuButtonGrouper, MenuButton } from './common'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import HomeIcon from '@mui/icons-material/Home'
import InsightsIcon from '@mui/icons-material/Insights'
import { useRouter } from 'next/router'
import ReceiptLong from '@mui/icons-material/ReceiptLong'


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
            icon={<InsightsIcon />}
            text='Navs'
            onClick={() => router.push('/navs')}
            level={1}
          />
          <MenuButton
            icon={<ReceiptLong />}
            text='Trade Log'
            onClick={() => router.push('/tradelog')}
            level={1}
          />
        </List>
      </Collapse>
    </>
  )
}

export default PagesMenu

