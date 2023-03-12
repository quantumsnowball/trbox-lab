import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { Data } from "plotly.js";
import { FC } from "react";
import { useSelector } from "react-redux";
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


export const PlotlyChartMultiDemo: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  // const data = useSelector((s: RootState) => s.content.result.study.data[path]?.[strategy] ?? [])
  return (
    <Plot
      data={[
        {
          x: [2, 3, 4],
          y: [2, 3, 4],
          xaxis: 'x',
          yaxis: 'y1',
          type: 'scatter'
        },
        {
          x: [1, 2, 3],
          y: [2, 3, 4],
          xaxis: 'x',
          yaxis: 'y2',
          type: 'scatter'
        },
      ]}
      layout={{
        showlegend: true,
        legend: {
          x: 0,
          y: 1,
          yanchor: 'bottom',
          orientation: 'h',
        },
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
        margin: { l: 20, r: 50, t: 20, b: 20 },
        grid: {
          rows: 2,
          columns: 1,
          // subplots: ['xy1', 'xy2',],
          // roworder: 'top to bottom',
        }
      }}
      config={{
        responsive: true,
      }}
    />
  )
}

const PlotlyChart: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const mainSeries = useSelector((s: RootState) => s.content.result.study.series[path]?.[strategy]?.main ?? {})
  const subSeries = useSelector((s: RootState) => s.content.result.study.series[path]?.[strategy]?.sub ?? {})
  const mainData = Object.entries(mainSeries).map(([_, d]) => d)
  const subData = Object.entries(subSeries).map(([_, d]) => d)
  const data = [...mainData, ...subData]
  console.log({ data })

  return (
    <Plot
      data={data}
      layout={{
        showlegend: true,
        legend: {
          x: 0,
          y: 1,
          yanchor: 'bottom',
          orientation: 'h',
        },
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
        margin: { l: 20, r: 50, t: 20, b: 20 },
        grid: {
          rows: 2,
          columns: 1,
          // subplots: ['xy1', 'xy2',],
          // roworder: 'top to bottom',
        }
      }}
      config={{
        responsive: true,
      }}
    />
  )
}
export default PlotlyChart
