import { TreeDict } from "@/common/types"
import { resultTreeTempActions } from "@/redux/slices/resultTreeTemp"
import { RootState } from "@/redux/store"
import { Button, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import FolderIcon from '@mui/icons-material/Folder';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import { FC } from "react"

const PREFIX = '.result'

const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.startsWith(PREFIX) ?
      <LeaderboardOutlinedIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const dirThenName = (a: [string, TreeDict | null], b: [string, TreeDict | null]) => {
  if (a[1] && !b[1]) return -1
  if (!a[1] && b[1]) return +1
  if (a[0] < b[0]) return -1
  if (a[0] > b[0]) return +1
  return 0
}

const Summary = () => {
  const dispatch = useDispatch()
  const dirTree = useSelector((s: RootState) => s.resultTreeTemp.dirTree)
  const [nodes, appendNode, popNode] = [
    useSelector((s: RootState) => s.resultTreeTemp.nodes),
    (n: string) => dispatch(resultTreeTempActions.appendNode(n)),
    () => dispatch(resultTreeTempActions.popNode()),
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
        Object.entries(selected).sort(dirThenName).map(([name, node]) =>
          <Typography
            key={name}
            variant='h6'
            sx={{ m: 1, p: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => {
              if (!nodes.at(-1)?.startsWith(PREFIX))
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
