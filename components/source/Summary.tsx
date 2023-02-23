import { Node } from "@/common/types"
import { Box, Typography } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { FC } from "react"
import { byDirThenName } from "../common/utils"
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { SOURCE_FILE_SUFFIX, SOURCE_ROOT } from "./constants";


const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.endsWith(SOURCE_FILE_SUFFIX) ?
      <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

type Props = {
  nodes: Node[]
}


const Summary: FC<Props> = ({ nodes }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const lastNode = nodes.at(-1)
  const entries = lastNode && lastNode.children
  const viewSource = () => dispatch(layoutTempActions.goToSourceSection('source'))


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
              console.log(name)
              if (name.endsWith(SOURCE_FILE_SUFFIX)) {
                viewSource()
              }
              router.push(SOURCE_ROOT + path)
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
