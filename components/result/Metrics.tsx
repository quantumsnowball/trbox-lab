import { FileNode } from "@/common/types"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { FC } from "react"
import { useGetMetricsQuery } from "@/redux/slices/apiSlice";


const Content: FC<{ path: string }> = ({ path }) => {
  const { data: metrics } = useGetMetricsQuery(path)
  return (
    <TableContainer component={Paper}>
      <Table size='small'>
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
                    {val.toFixed(4)}
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

const Metrics: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path

  return (
    <Box
      id='viewer-div'
      className='expanding scroll flex column start stretch'
      sx={{ mx: 1 }}
    >
      {path ? <Content {...{ path }} /> : null}
    </Box>
  )
}

export default Metrics
