import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined'
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { IconButton } from '@mui/material'
import { MouseEventHandler } from 'react'


export const UpOneLevelButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) =>
  <IconButton
    onClick={onClick}
  >
    <ArrowUpwardOutlinedIcon />
  </IconButton>

export const RefreshButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) =>
  <IconButton
    onClick={onClick}
  >
    <SyncOutlinedIcon />
  </IconButton>

