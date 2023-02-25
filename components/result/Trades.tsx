import { FileNode } from "@/common/types";
import { useGetMetaQuery, useGetTradesQuery } from "@/redux/slices/apiSlice";
import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from "@mui/material";
import { FC, useState } from "react";



const Content: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const { data } = useGetTradesQuery({ path, strategy })
  const fields = data?.schema.fields.map((field: { name: string }) => field.name)
  const trades = data?.data
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

const Tabbed: FC<{ path: string | undefined }> = ({ path }) => {
  const { data: meta } = useGetMetaQuery(path ?? '')
  const strategies = meta?.strategies
  const [tabId, setTabId] = useState(0)

  return (
    <>
      <Box>
        <Tabs
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
      </Box>
    </>
  )
}

const Trades: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path

  return (
    <Box
      className='expanding flex column start stretch'
    >
      <Tabbed {...{ path }} />
    </Box>
  )
}

export default Trades

