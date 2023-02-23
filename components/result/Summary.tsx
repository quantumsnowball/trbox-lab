import { FileNode } from "@/common/types"
import { Box, Typography } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import { FC } from "react"
import { byDirThenName } from "../common/utils"
import { useRouter } from 'next/router'
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { RESULT_DIR_PREFIX, RESULT_ROOT } from "./constants";
import { useDispatch } from "react-redux";


const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.startsWith(RESULT_DIR_PREFIX) ?
      <LeaderboardOutlinedIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>


const Summary: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const lastNode = nodes.at(-1)
  const entries = lastNode && lastNode.children
  const viewMetrics = () => dispatch(layoutTempActions.goToResultSection('metrics'))

  return (
    <Box
      className='expanding scroll'
    >
      {
        entries && [...entries].sort(byDirThenName).map(({ name, type, path }) =>
          <Typography
            key={name}
            variant='h6'
            className='flex row start'
            sx={{ m: 1, p: 1, cursor: 'pointer' }}
            onClick={() => {
              if (name.startsWith(RESULT_DIR_PREFIX)) {
                viewMetrics()
              }
              router.push(RESULT_ROOT + path)
            }}
          >
            <Icon name={name} />
            {name}{type === 'folder' ? '/' : null}
          </Typography>)
      }
    </Box>
  )
}
export default Summary

