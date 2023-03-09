import { IconButton } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { FC } from "react"
import { RESULT_DIR_PREFIX } from "@/components/result/constants";
import { useDeleteResourceMutation } from "@/redux/slices/apiSlice";


export const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.startsWith(RESULT_DIR_PREFIX) ?
      <LeaderboardOutlinedIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

export const DeleteButton: FC<{ path: string }> = ({ path }) => {
  const [deletePath,] = useDeleteResourceMutation()

  return (
    <IconButton
      color='error'
      onClick={() => {
        console.log({ path })
        deletePath(path)
      }}
    >
      <DeleteForeverOutlinedIcon />
    </IconButton >
  )
}


