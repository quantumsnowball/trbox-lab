import { List, Collapse } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import InfoIcon from '@mui/icons-material/Info'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { layoutActions } from '../../../redux/slices/layout'
import { MenuLabel, MenuButtonGrouper } from './common'
import { VERSION } from '../../../common/constants'


function AboutMenu() {
  const dispatch = useDispatch()
  const [state, toggle] = [
    useSelector((s: RootState) => s.layout.menuDrawer.about.expanded),
    () => dispatch(layoutActions.toggleAbout())
  ]

  return (
    <>
      <MenuButtonGrouper
        icon={<HelpOutlineIcon />}
        text='About'
        open={state}
        toggle={toggle}
      />
      <Collapse in={state} timeout="auto" unmountOnExit>
        <List>
          <MenuLabel
            icon={<InfoIcon />}
            label={`version ${VERSION}`}
            level={1}
            primaryTypographyProps={{ variant: 'caption' }}
          />
          <MenuLabel
            icon={<InfoIcon />}
            label={`@2023\nQuantum Snowball`}
            level={1}
            primaryTypographyProps={{ variant: 'caption' }}
          />
        </List>
      </Collapse>
    </>
  )
}

export default AboutMenu
