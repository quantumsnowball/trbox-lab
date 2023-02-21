import { Node } from "@/common/types"
import { Box, Typography } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import { FC } from "react"
import { byDirThenName } from "../common/utils"
import { useRouter } from 'next/router'
import { useGetResultQuery } from "@/redux/slices/apiSlice";

const ROOT = '/result'
const PREFIX = '.result'

const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.startsWith(PREFIX) ?
      <LeaderboardOutlinedIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const Brief: FC<{ path: string }> = ({ path }) => {
  const { data: meta } = useGetResultQuery(path)

  return (
    <>
      {
        meta ?
          <Box
            sx={{ m: 1, p: 1 }}
          >
            {
              Object.entries(meta).map(([k, v]) =>
                <Typography
                  variant='h6'
                  sx={{ userSelect: 'text' }}
                >{k} = {v}
                </Typography>)
            }

          </Box>
          : null
      }
    </>

  )
}

const Summary: FC<{ nodes: Node[] }> = ({ nodes }) => {
  const router = useRouter()
  const lastNode = nodes.at(-1)
  const entries = lastNode && lastNode.children

  return (
    <>
      {lastNode?.name.startsWith(PREFIX) ?
        <Brief path={lastNode.path} />
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
