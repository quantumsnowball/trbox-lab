import { FileNode } from "@/common/types"
import { Box, Paper, Typography } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import { FC } from "react"
import { byDirThenName } from "../common/utils"
import { useRouter } from 'next/router'
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { RESULT_DIR_PREFIX, RESULT_ROOT } from "./constants";
import { useDispatch } from "react-redux";
import { resultDirDatetimeFormatted } from "@/common/utils";
import { StrategyParams, useGetMetaQuery } from "@/redux/slices/apiSlice";


const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.startsWith(RESULT_DIR_PREFIX) ?
      <LeaderboardOutlinedIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const Row: FC<{ name: string, type: string, path: string }> = ({ name, type, path }) => {
  const router = useRouter()
  return (
    <Typography
      key={name}
      variant='h6'
      className='flex row start'
      sx={{ m: 1, p: 1, cursor: 'pointer' }}
      onClick={() => {
        router.push(RESULT_ROOT + path)
      }}
    >
      <Icon name={name} />{name}{type === 'folder' ? '/' : null}
    </Typography>
  )
}

const Card: FC<{ name: string, path: string }> = ({ name, path }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const viewMetrics = () => dispatch(layoutTempActions.goToResultSection('metrics'))
  const { data: meta } = useGetMetaQuery(path)

  const Field: FC<{
    name: string | undefined,
    desc: string | number | undefined
  }> = ({ name, desc }) =>
      <Typography sx={{ fontFamily: 'monospace' }}>
        {name}: {desc}
      </Typography>

  const Params: FC<{ params: StrategyParams }> = ({ params }) =>
    <>
      <Field name='Parameters:' desc='' />
      <Box
        sx={{ pl: 3 }}
      >
        {
          Object.entries(params).map(([name, str]) =>
            <Field name={name} desc={str} />)
        }
      </Box>
    </>

  return (
    <Paper
      elevation={1}
      key={name}
      sx={{ m: 1, p: 1 }}
    >
      <Typography
        variant='h6'
        className='flex row start'
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          viewMetrics()
          router.push(RESULT_ROOT + path)
        }}
      >
        <Icon name={name} />
        {resultDirDatetimeFormatted(name)}
      </Typography>
      <Field name='source' desc={meta?.source} />
      <Field name='strategies' desc={meta?.strategies.length} />
      {
        meta?.params ?
          <Params params={meta.params} />
          :
          null
      }
    </Paper>
  )
}


const Summary: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes.at(-1)
  const entries = lastNode && lastNode.children

  return (
    <Box
      className='expanding scroll'
    >
      {
        entries && [...entries].sort(byDirThenName).map(({ name, type, path }) =>
          name.startsWith(RESULT_DIR_PREFIX) ?
            <Card {...{ name, path }} />
            :
            <Row {...{ name, type, path }} />
        )
      }
    </Box>
  )
}
export default Summary

