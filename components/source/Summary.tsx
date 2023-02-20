import { TreeDict } from "@/common/types"
import { Typography } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { FC } from "react"
import { byDirThenName } from "../common/utils"
import { useRouter } from "next/router";

const SUFFIX = '.py'

const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.endsWith(SUFFIX) ?
      <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

type Props = {
  slugs: string[]
  dirTree: TreeDict
}

const Summary: FC<Props> = ({ slugs, dirTree }) => {
  const router = useRouter()
  const lastNode = slugs.reduce((tree, name, _, _arr) => {
    const node = tree[name]
    // is a file, break the loop
    if (node === null) {
      _arr = []
      return {}
    }
    // iter to next node
    return tree[name] as TreeDict
  }, dirTree)

  return (
    <>
      {
        Object.entries(lastNode).sort(byDirThenName).map(([name, node]) =>
          <Typography
            key={name}
            variant='h6'
            sx={{ m: 1, p: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => {
              if (!slugs.at(-1)?.endsWith(SUFFIX)) {
                router.push(`${window.location.pathname}/${name}`)
              }
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
