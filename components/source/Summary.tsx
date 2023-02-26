import { FileNode } from "@/common/types"
import { Box, Button, IconButton, Typography } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { FC } from "react"
import { byDirThenName } from "../common/utils"
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { SOURCE_FILE_SUFFIX, SOURCE_ROOT } from "./constants";
import { useLazyGetSourceTreeQuery } from "@/redux/slices/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDeleteResourceMutation } from "@/redux/slices/apiSlice";


const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.endsWith(SOURCE_FILE_SUFFIX) ?
      <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const FileOpsBar: FC = () => {
  const dispatch = useDispatch()
  const delMode = useSelector((s: RootState) => s.layoutTemp.source.fileOps.deleteMode)
  const toggleDelMode = () => dispatch(layoutTempActions.toggleSourceFileDeleteMode())
  const [trigger,] = useLazyGetSourceTreeQuery()
  return (
    <Box
      className='flex row end'
    >
      <Button
        startIcon={<SyncOutlinedIcon />}
        onClick={() => trigger()}
      >
        Refresh
      </Button>
      <Button
        color={delMode ? 'secondary' : 'error'}
        startIcon={delMode ? <CancelOutlinedIcon /> : <DeleteOutlinedIcon />}
        onClick={toggleDelMode}
      >
        {delMode ? 'Cancel' : 'Delete'}
      </Button>
    </Box>
  )
}

const DeleteButton: FC<{ path: string }> = ({ path }) => {
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

type Props = {
  nodes: FileNode[]
}
const Summary: FC<Props> = ({ nodes }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const lastNode = nodes.at(-1)
  const entries = lastNode && lastNode.children
  const viewSource = () => dispatch(layoutTempActions.goToSourceSection('source'))
  const delMode = useSelector((s: RootState) => s.layoutTemp.source.fileOps.deleteMode)

  return (
    <>
      <Box
        className='expanding scroll'
      >
        {
          entries && [...entries].sort(byDirThenName).map(({ name, type, path }) =>
            <Box
              className='flex row spread'
            >
              <Typography
                key={name}
                variant='h6'
                className='flex row start'
                sx={{ m: 1, p: 1, cursor: 'pointer' }}
                onClick={() => {
                  if (name.endsWith(SOURCE_FILE_SUFFIX)) {
                    viewSource()
                  }
                  router.push(SOURCE_ROOT + path)
                }}
              >
                <Icon name={name} />
                {name}{type === 'folder' ? '/' : null}
              </Typography>
              {
                delMode ?
                  <DeleteButton {...{ path }} />
                  :
                  null
              }
            </Box>
          )
        }
      </Box>
      <FileOpsBar />
    </>
  )
}
export default Summary
