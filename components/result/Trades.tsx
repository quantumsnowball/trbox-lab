import { FileNode } from "@/common/types";
import { roundCurrency, roundFloat } from "@/common/utils";
import { useGetMetaQuery, useGetTradesQuery } from "@/redux/slices/apiSlice";
import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from "@mui/material";
import { FC, useState } from "react";


const formatColumn = (column: string, val: string | number) => {
  switch (column) {
    case 'Date':
      return (val as string).replace('T', ' ').slice(0, -4)
    case 'Quantity':
      return roundFloat(4)(val as number)
    case 'Price':
    case 'GrossProceeds':
    case 'Fees':
    case 'NetProceeds':
      return roundCurrency(2)(val as number)
    default:
      return val
  }
}

const Content: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const { data } = useGetTradesQuery({ path, strategy })
  const fields = data?.schema.fields.map((field: { name: string }) => field.name)
  const trades = data?.data
  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        size='small'
      >
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
                    className='nowrap'
                    align='right'
                  >
                    {formatColumn(name, trade[name])}
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

const Tabbed: FC<{ path: string | undefined }> = ({ path }) => {
  const { data: meta } = useGetMetaQuery(path ?? '')
  const strategies = meta?.strategies
  const [tabId, setTabId] = useState(0)

  return (
    <>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={tabId}
        onChange={(_, newId) => setTabId(newId)}
      >
        {
          strategies?.map(name =>
            <Tab
              key={name}
              label={name}
              sx={{ textTransform: 'none' }}
            />
          )
        }
      </Tabs>
      {
        path && strategies &&
        <Content path={path} strategy={strategies[tabId]} />
      }
    </>
  )
}

const Trades: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path

  return (
    <Box
      className='expanding scroll flex column start stretch'
    >
      <Tabbed {...{ path }} />
    </Box>
  )
}

export default Trades

