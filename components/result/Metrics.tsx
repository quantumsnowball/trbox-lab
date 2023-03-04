import { FileNode } from "@/common/types"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { FC } from "react"
import { useGetMetricsQuery } from "@/redux/slices/apiSlice";


const roundFloat = (n: number) => (val: number) => val.toFixed(n)
const roundPct = (n: number) => (val: number) => `${(val * 100).toFixed(n)}%`

// const ColumnSpec = [
//   ['Total-%', roundPct(2)],
//   ['CAGR', roundPct(2)],
//   ['Mu', roundFloat(3)],
//   ['Sigma', roundFloat(3)],
//   ['Sharpe', roundFloat(3)],
//   ['Mdd-%', roundPct(2)],
//   ['Mdd-bar', roundFloat(0)],
//   ['Mdd-d', roundFloat(0)],
//   ['Calmar', roundFloat(3)],
// ]

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
      return roundFloat(3)
  }
}

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
            const strategy = metrics.index[i]
            return (
              <TableRow
                key={strategy}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"> {strategy} </TableCell>
                {
                  r.map((val, i) => {
                    const column = metrics.columns[i]
                    return (
                      <TableCell
                        key={i}
                        align='right'>
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
