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
import { resultDirDatetimeFormatted } from "@/common/utils";


const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.startsWith(RESULT_DIR_PREFIX) ?
      <LeaderboardOutlinedIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const Row: FC<{ name: string, type: string, path: string }> = ({ name, type, path }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const viewMetrics = () => dispatch(layoutTempActions.goToResultSection('metrics'))
  return (
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
      {
        name.startsWith(RESULT_DIR_PREFIX) ?
          resultDirDatetimeFormatted(name)
          : name
      }
      {type === 'folder' ? '/' : null}
    </Typography>
  )
}

const Card: FC<{ name: string, type: string, path: string }> = ({ name, type, path }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const viewMetrics = () => dispatch(layoutTempActions.goToResultSection('metrics'))
  return (
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
      {
        name.startsWith(RESULT_DIR_PREFIX) ?
          resultDirDatetimeFormatted(name)
          : name
      }
      {type === 'folder' ? '/' : null}
    </Typography>
  )
}


const Summary: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes.at(-1)
  const entries = lastNode && lastNode.children

  return (
    <Box
      className='expanding scroll'
    >
      {
        entries && [...entries].sort(byDirThenName).map(({ name, type, path }) =>
          name.startsWith(RESULT_DIR_PREFIX) ?
            <Card {...{ name, type, path }} />
            :
            <Row {...{ name, type, path }} />
        )
      }
    </Box>
  )
}
export default Summary

