import { FileNode } from "@/common/types"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { FC } from "react"
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
                {ColumnHeader(colname)}
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
                <TableCell
                  className='nowrap'
                  component="th"
                  scope="row"
                >
                  {strategy}
                </TableCell>
                {
                  r.map((val, i) => {
                    const column = metrics.columns[i]
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
