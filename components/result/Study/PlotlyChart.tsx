import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useSelector } from "react-redux";
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


const PlotlyChart: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const data = useSelector((s: RootState) => s.content.result.study.data[path]?.[strategy] ?? [])
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
        yaxis: { side: 'right' },
        margin: { l: 20, r: 50, t: 20, b: 20 },
      }}
      config={{
        responsive: true,
      }}
    />
  )
}
export default PlotlyChart
