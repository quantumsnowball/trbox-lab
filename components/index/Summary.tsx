import { TreeDict } from "@/common/types"
import { srcTreeTempActions } from "@/redux/slices/srcTreeTemp"
import { RootState } from "@/redux/store"
import { Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { FC } from "react"
import { byDirThenName } from "../common/utils"

const SUFFIX = '.py'

const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.endsWith(SUFFIX) ?
      <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const Summary = () => {
  const dispatch = useDispatch()
  const dirTree = useSelector((s: RootState) => s.srcTreeTemp.dirTree)
  const [nodes, appendNode] = [
    useSelector((s: RootState) => s.srcTreeTemp.nodes),
    (n: string) => dispatch(srcTreeTempActions.appendNode(n)),
  ]
  const selected = nodes.reduce((tree, name, _, arr) => {
    const node = tree[name]
    // is a file, break the loop, return TODO: file ops
    if (node === null) {
      arr = []
      return {}
    }
    // iter to next node
    return tree[name] as TreeDict
  }, dirTree)

  return (
    <>
      {
        Object.entries(selected).sort(byDirThenName).map(([name, node]) =>
          <Typography
            key={name}
            variant='h6'
            sx={{ m: 1, p: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => {
              if (!nodes.at(-1)?.endsWith(SUFFIX))
                appendNode(name)
            }}
          >
            <Icon name={name} />
            {name}{node ? '/' : null}
          </Typography>)
      }
    </>
  )
}
export default Summary
