import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { Layout } from "plotly.js";
import { FC } from "react";
import { useSelector } from "react-redux";
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const BASE_LAYOUT: Partial<Layout> = {
  showlegend: true,
  legend: {
    x: 0,
    y: 1,
    yanchor: 'bottom',
    orientation: 'h',
  },
  margin: { l: 20, r: 50, t: 20, b: 20 },
}

const TWO_ROWS_LAYOUT: Partial<Layout> = {
  ...BASE_LAYOUT, ...{
    yaxis: {
      // from bottom to top
      domain: [0.2, 1.0],
      side: 'right'
    },
    yaxis2: {
      // from bottom to top
      domain: [0.0, 0.2],
      side: 'right'
    },
    grid: {
      rows: 2,
      columns: 1,
      // subplots: ['xy1', 'xy2',],
      // roworder: 'top to bottom',
    }
  }
}

const BASE_CONFIG = {
  responsive: true,
}

const PlotlyChart: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const mainSeries = useSelector((s: RootState) => s.content.result.study.series[path]?.[strategy]?.main ?? {})
  const subSeries = useSelector((s: RootState) => s.content.result.study.series[path]?.[strategy]?.sub ?? {})
  const mainData = Object.entries(mainSeries).map(([_, d]) => d)
  const subData = Object.entries(subSeries).map(([_, d]) => d)
  const data = [...mainData, ...subData]

  return (
    <Plot
      data={structuredClone(data)}
      layout={subData.length > 0 ? TWO_ROWS_LAYOUT : BASE_LAYOUT}
      config={BASE_CONFIG}
    />
  )
}
export default PlotlyChart
