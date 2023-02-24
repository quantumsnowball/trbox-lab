import { FileNode } from "@/common/types";
import { Equities, useGetEquityQuery } from "@/redux/slices/apiSlice";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ColorType, createChart, IChartApi, ISeriesApi, PriceScaleMode } from "lightweight-charts";
import { FC, useEffect, useRef } from "react";



const Content: FC<{ path: string }> = ({ path }) => {
  const { data: equities } = useGetEquityQuery(path)
  const ctnRef = useRef<HTMLDivElement | null>(null)
  // const series = useRef<ISeriesApi<'Area'> | null>(null)
  const chart = useRef<IChartApi | null>(null)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    if (!equities)
      return
    // create chart only if not already exists
    if (chart.current)
      return
    // create chart
    chart.current = createChart(ctnRef?.current ?? '', {
      autoSize: true,
    });
    console.debug('chart created')
    // add data
    Object.entries(equities).forEach(([name, equity]) => {
      // create series
      const series = chart.current?.addLineSeries();
      // add data
      const equityParsed = Object.entries(equity).map(([time, value]) =>
        ({ time: time.split('T')[0], value }))
      series?.setData(equityParsed);
      // customization
      series?.applyOptions({
        priceFormat: { type: 'volume', precision: 2, }
      })
      console.debug('series data injected')
    })
    chart.current.timeScale().fitContent()
  }, [equities])

  return (
    <Box
      ref={ctnRef}
      className='expanding flex row'
    />
  )
}

const Equity: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
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

export default Equity
