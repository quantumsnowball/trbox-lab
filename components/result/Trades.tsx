import { FileNode } from "@/common/types";
import { useGetTradesQuery } from "@/redux/slices/apiSlice";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC } from "react";

const Content: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const { data } = useGetTradesQuery({ path, strategy })
  const fields = data?.schema.fields.map((field: { name: string }) => field.name)
  const trades = data?.data
  if (trades) console.log(data)
  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            {fields?.map(colname =>
              <TableCell
                key={colname}
                align='right'
              >
                {colname}
              </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            trades?.map((trade, i) =>
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {fields?.map(name =>
                  <TableCell
                    key={name}
                    align='right'>
                    {trade[name]}
                  </TableCell>
                )}
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )

}

const Trades: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path
  const strategy = 'basic' // TODO

  return (
    <Box
      className='expanding flex column start'
    >
      {
        (path && strategy) ?
          <Content {...{ path, strategy }} />
          : null
      }
    </Box>
  )
}

export default Trades

