import { Node } from "@/common/types"
import { Box, Typography } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { FC } from "react"
import { byDirThenName } from "../common/utils"
import { useRouter } from "next/router";
import { useGetSourceQuery } from "@/redux/slices/apiSlice";

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

const Code: FC<{ path: string }> = ({ path }) => {
  const { data: source } = useGetSourceQuery(path)

  return (
    <>
      {source ?
        <Box
          sx={{ m: 1, p: 1 }}
        >
          <Typography
            variant='h6'
          >
            <code>
              {source.code}
            </code>
          </Typography>
        </Box >
        : null
      }
    </>
  )
}

const Summary: FC<Props> = ({ nodes }) => {
  const router = useRouter()
  const lastNode = nodes.at(-1)
  const entries = lastNode && lastNode.children


  return (
    <>
      {lastNode?.name.endsWith(SUFFIX) ?
        <Code path={lastNode.path} />
        :
        entries && [...entries].sort(byDirThenName).map(({ name, type, path }) =>
          <Typography
            key={name}
            variant='h6'
            sx={{ m: 1, p: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => router.push(ROOT + path)}
          >
            <Icon name={name} />
            {name}{type === 'folder' ? '/' : null}
          </Typography>)
      }
    </>
  )
}
export default Summary
