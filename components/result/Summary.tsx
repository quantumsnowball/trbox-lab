import { Node } from "@/common/types"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
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

const MetricsTable: FC<{ path: string }> = ({ path }) => {
  const { data: metrics } = useGetResultQuery(path)
  console.log(metrics)


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            {metrics?.columns.map(colname =>
              <TableCell
                key={colname}
                align='right'
              >
                {colname}
              </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {metrics?.data.map((r, i) => {
            const name = metrics.index[i]
            return (
              <TableRow
                key={name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"> {name} </TableCell>

                {r.map((val, i) =>
                  <TableCell
                    key={i}
                    align='right'>
                    {val}
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Summary: FC<{ nodes: Node[] }> = ({ nodes }) => {
  const router = useRouter()
  const lastNode = nodes.at(-1)
  const entries = lastNode && lastNode.children

  return (
    <>
      {lastNode?.name.startsWith(PREFIX) ?
        <MetricsTable path={lastNode.path} />
        :
        entries && [...entries].sort(byDirThenName).map(({ name, type, path }) =>
          <Typography
            key={name}
            variant='h6'
            className='flex row start'
            sx={{ m: 1, p: 1, cursor: 'pointer' }}
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

