import { roundCurrency, roundFloat } from "@/common/utils";
import { useGetTradesQuery } from "@/redux/slices/apiSlice";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";


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

const TradeList: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const { data } = useGetTradesQuery({ path, strategy })
  const fields = data?.schema.fields.map((field: { name: string }) => field.name)
  const trades = data?.data
  return (
    <TableContainer
      className='expanding'
      component={Paper}
    >
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
                    sx={{ userSelect: 'text' }}
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

export default TradeList
