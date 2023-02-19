import { TreeDict } from "@/common/types"
import { layoutTempActions } from "@/redux/slices/layoutTemp"
import { RootState } from "@/redux/store"
import { Button, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"


const Summary = () => {
  const dispatch = useDispatch()
  const dirTree = useSelector((s: RootState) => s.layoutTemp.breadCrumbs.dirTree)
  const [nodes, appendNode, popNode] = [
    useSelector((s: RootState) => s.layoutTemp.breadCrumbs.nodes),
    (n: string) => dispatch(layoutTempActions.appendNode(n)),
    () => dispatch(layoutTempActions.popNode()),
  ]
  const selected = nodes.reduce((tree, name, _, arr) => {
    const node = tree[name]
    // is a file, break the loop, return last node
    if (node === null) {
      arr = []
      return tree
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
            sx={{ m: 1, p: 1, cursor: 'pointer' }}
            onClick={() => {
              if (!nodes.at(-1)?.endsWith('.py'))
                appendNode(name)
            }}
          >
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