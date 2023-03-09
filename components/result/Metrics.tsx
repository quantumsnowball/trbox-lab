import { FileNode } from "@/common/types"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { FC, useState } from "react"
import { useGetMetricsQuery } from "@/redux/slices/apiSlice";
import { roundFloat, roundPct } from "@/common/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { layoutTempActions } from "@/redux/slices/layoutTemp";


const ColumnHeaderFormat = (column: string) => {
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
  // const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const dispatch = useDispatch()
  const order = useSelector((s: RootState) => s.layoutTemp.result.metrics.order)
  const toggleOrder = () => dispatch(layoutTempActions.toggleMetricsOrder())
  const sort = useSelector((s: RootState) => s.layoutTemp.result.metrics.sort)
  const setSort = (c: string) => dispatch(layoutTempActions.setMetricsSort(c))
  const { data: metrics } = useGetMetricsQuery(path)
  const headers = metrics?.columns
  const rows = metrics?.data
  console.log({ sort, order })

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
                sx={j === 0 ? {
                  position: 'sticky',
                  left: 0,
                  zIndex: 99,
                  backgroundColor: 'background.paper',
                } : {}}
              >
                <TableSortLabel
                  active={colname === sort}
                  direction={colname === sort ? order : 'desc'}
                  onClick={() => {
                    if (colname === sort) {
                      toggleOrder()
                    } else {
                      setSort(colname)
                    }
                  }}
                >
                  {ColumnHeaderFormat(colname)}
                </TableSortLabel>
              </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {metrics && headers && rows && [...rows]
            // .sort(compareBy(sortId, order === 'asc'))
            .map(row => {
              const strategy = row[0] as string
              return (
                <TableRow
                  key={strategy}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {
                    row.map((val, j) => {
                      const column = headers[j]
                      return (
                        <TableCell
                          key={j}
                          className='nowrap'
                          align='right'
                          sx={j === 0 ? {
                            position: 'sticky',
                            left: 0,
                            backgroundColor: 'background.paper',
                          } : {}}
                        >
                          {j === 0 ? val : ColumnFormat(column)(val as number)}
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
