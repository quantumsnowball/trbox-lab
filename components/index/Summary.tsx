import { TreeDict } from "@/common/types"
import { srcTreeTempActions } from "@/redux/slices/srcTreeTemp"
import { RootState } from "@/redux/store"
import { Button, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { FC } from "react"


const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.endsWith('.py') ?
      <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const Summary = () => {
  const dispatch = useDispatch()
  const dirTree = useSelector((s: RootState) => s.srcTreeTemp.dirTree)
  const [nodes, appendNode, popNode] = [
    useSelector((s: RootState) => s.srcTreeTemp.nodes),
    (n: string) => dispatch(srcTreeTempActions.appendNode(n)),
    () => dispatch(srcTreeTempActions.popNode()),
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
        Object.entries(selected).map(([name, node]) =>
          <Typography
            key={name}
            variant='h6'
            sx={{ m: 1, p: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => {
              if (!nodes.at(-1)?.endsWith('.py'))
                appendNode(name)
            }}
          >
            <Icon name={name} />
            {name}{node ? '/' : null}
          </Typography>)
      }
      {
        nodes.length > 0 ?
          <Button
            onClick={() => popNode()}
            sx={{ cursor: 'pointer' }}
          >
            go back
          </Button>
          : null
      }
    </>
  )
}
export default Summary
