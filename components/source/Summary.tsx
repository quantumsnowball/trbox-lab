import { Node } from "@/common/types"
import { Typography } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { FC, useEffect } from "react"
import { byDirThenName } from "../common/utils"
import { useRouter } from "next/router";
import Code from "./Code";
import { useDispatch } from "react-redux";
import { layoutTempActions } from "@/redux/slices/layoutTemp";

const ROOT = '/source'
const SUFFIX = '.py'

const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.endsWith(SUFFIX) ?
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
    <>
      {
        entries && [...entries].sort(byDirThenName).map(({ name, type, path }) =>
          <Typography
            key={name}
            variant='h6'
            className='flex row start'
            sx={{ m: 1, p: 1, cursor: 'pointer' }}
            onClick={() => {
              // if (lastNode?.name.endsWith(SUFFIX))
              viewSource()
              router.push(ROOT + path)
            }}
          >
            <Icon name={name} />
            {name}{type === 'folder' ? '/' : null}
          </Typography>)
      }
    </>
  )
}
export default Summary
