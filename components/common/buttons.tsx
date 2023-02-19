import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined'
import { IconButton } from '@mui/material'
import { MouseEventHandler } from 'react'


export const UpOneLevelButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) =>
  <IconButton
    onClick={onClick}
    sx={{mr:1}}
  >
    <ArrowUpwardOutlinedIcon />
  </IconButton>

