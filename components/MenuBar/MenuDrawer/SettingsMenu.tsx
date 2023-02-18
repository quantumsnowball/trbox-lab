import {
  List,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate'
import RestoreIcon from '@mui/icons-material/Restore'
import { useDispatch } from 'react-redux'
import { layoutActions } from '../../../redux/slices/layout'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
// import { MenuButton, MenuButtonGrouper } from './common'
import { Dispatch, SetStateAction, useState } from 'react'
import { MenuButton, MenuButtonGrouper } from './common'


const reloadApp = () => {
  window.location.reload()
}

const resetApp = () => {
  window.sessionStorage.clear()
  window.localStorage.clear()
  reloadApp()
}

type ConfirmDialogProps = {
  title: string,
  content: string,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  action: () => void
}

const ConfirmDialog = ({
  title,
  content,
  open,
  setOpen,
  action
}: ConfirmDialogProps) =>
  <Dialog
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title"> {title} </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description"> {content} </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        autoFocus
        variant="outlined"
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
      <Button
        color="error"
        variant="contained"
        onClick={() => {
          action()
          setOpen(false)
        }}>
        CONFIRM
      </Button>
    </DialogActions>
  </Dialog>


function SettingsMenu() {
  const menuSettingsExpanded = useSelector((s: RootState) => s.layout.menuDrawer.settings.expanded)
  const dispatch = useDispatch()
  const [reloadDialog, setReloadDialog] = useState(false)
  const [resetDialog, setResetDialog] = useState(false)

  return (
    <>
      <MenuButtonGrouper
        icon={<SettingsIcon />}
        text="Settings"
        open={menuSettingsExpanded}
        toggle={() => dispatch(layoutActions.toggleSettings())}
      />
      <Collapse in={menuSettingsExpanded} timeout="auto" unmountOnExit>
        <List>
          <MenuButton
            icon={<SystemUpdateIcon />}
            text='Update App'
            onClick={e => {
              setReloadDialog(true)
              e.stopPropagation()
            }}
            level={1}
          />
          <ConfirmDialog
            title='Update App'
            content='This will reload all app files from the server. User data will remain saved. You may need to reopen this app to show all updated features.'
            open={reloadDialog}
            setOpen={setReloadDialog}
            action={reloadApp}
          />
          <MenuButton
            icon={<RestoreIcon />}
            text='Reset App'
            onClick={e => {
              setResetDialog(true)
              e.stopPropagation()
            }}
            level={1}
          />
          <ConfirmDialog
            title='Reset App'
            content='This will reload the app and also reset storage data. All user data will be lost! Are you sure?'
            open={resetDialog}
            setOpen={setResetDialog}
            action={resetApp}
          />
        </List>
      </Collapse>
    </>
  )
}

export default SettingsMenu
