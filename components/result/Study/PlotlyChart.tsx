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
  yaxis: { side: 'right' },
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
    }
  }
}

const THREE_ROWS_LAYOUT: Partial<Layout> = {
  ...BASE_LAYOUT, ...{
    yaxis: {
      // from bottom to top
      domain: [0.3, 1.0],
      side: 'right'
    },
    yaxis2: {
      // from bottom to top
      domain: [0.15, 0.3],
      side: 'right'
    },
    yaxis3: {
      // from bottom to top
      domain: [0.0, 0.15],
      side: 'right'
    },
    grid: {
      rows: 3,
      columns: 1,
    }
  }
}

const BASE_CONFIG = {
  responsive: true,
}

const PlotlyChart: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const mainSeries = useSelector((s: RootState) => s.content.result.study.series[path]?.[strategy]?.main ?? {})
  const sub1Series = useSelector((s: RootState) => s.content.result.study.series[path]?.[strategy]?.sub1 ?? {})
  const mainData = Object.entries(mainSeries).map(([_, d]) => d)
  const sub1Data = Object.entries(sub1Series).map(([_, d]) => d)
  const data = [...mainData, ...sub1Data]

  return (
    <Plot
      data={structuredClone(data)}
      layout={subData.length > 0 ? TWO_ROWS_LAYOUT : BASE_LAYOUT}
      config={BASE_CONFIG}
    />
  )
}
export default PlotlyChart
