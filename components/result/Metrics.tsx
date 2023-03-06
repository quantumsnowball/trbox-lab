import { FileNode } from "@/common/types"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { FC, useState } from "react"
import { useGetMetricsQuery } from "@/redux/slices/apiSlice";
import { roundFloat, roundPct } from "@/common/utils";


const ColumnHeader = (column: string) => {
  switch (column) {
    case 'total_return': return 'Total%'
    case 'cagr': return 'CAGR'
    case 'mu': return 'Mu'
    case 'sigma': return 'Sigma'
    case 'sharpe': return 'Sharpe'
    case 'mdd_pct': return 'Mdd%'
    case 'mdd_bars': return 'Bars'
    case 'mdd_days': return 'Days'
    case 'calmar': return 'Calmar'
    default: return column
  }
}

const ColumnFormat = (column: string) => {
  switch (column) {
    case 'total_return':
    case 'cagr':
    case 'mdd_pct':
      return roundPct(2)
    case 'mu':
    case 'sigma':
    case 'sharpe':
    case 'calmar':
      return roundFloat(3)
    case 'mdd_bars':
    case 'mdd_days':
      return roundFloat(0)
    default:
      return (val: string | number) => val
  }
}


const Content: FC<{ path: string }> = ({ path }) => {
  const { data: metrics } = useGetMetricsQuery(path)
  const headers = metrics && ['Name', ...metrics.columns]
  const rows = metrics?.data.map((row, i) => [metrics.index[i], ...row])
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [orderBy, setOrderBy] = useState(5) // sharpe

  const compareBy = (j: number, asc: boolean) =>
    (a: (string | number)[], b: (string | number)[]) => {
      if (a[j] < b[j]) return asc ? -1 : +1
      if (a[j] > b[j]) return asc ? +1 : -1
      return 0
    }

  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        size='small'
      >
        <TableHead>
          <TableRow>
            {headers?.map((colname, j) =>
              <TableCell
                key={colname}
                align='right'
              >
                <TableSortLabel
                  active={j === orderBy}
                  direction={j === orderBy ? order : 'desc'}
                  onClick={() => {
                    if (j === orderBy) {
                      setOrder(order === 'desc' ? 'asc' : 'desc')
                    } else {
                      setOrderBy(j)
                      setOrder('desc')
                    }
                  }}
                >
                  {ColumnHeader(colname)}
                </TableSortLabel>
              </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {metrics && headers && rows && [...rows]
            .sort(compareBy(orderBy, order === 'asc'))
            .map(row => {
              const strategy = row[0] as string
              return (
                <TableRow
                  key={strategy}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {
                    row.map((val, i) => {
                      const column = headers[i]
                      return (
                        <TableCell
                          key={i}
                          className='nowrap'
                          align='right'
                        >
                          {ColumnFormat(column)(val)}
                        </TableCell>
                      )
                    })
                  }
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
