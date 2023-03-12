import { useGetEquityQuery } from "@/redux/slices/apiSlice";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// import Plot from "react-plotly.js";
// note: using the above import statement with next.js causing "'self' is not defined" issue
// import like below fixed it
import dynamic from "next/dynamic";
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


const PlotlyChart: FC<{ path: string }> = ({ path }) => {
  const checked = useSelector((s: RootState) => s.layoutTemp.result.equity.checked)
  const { data: equities } = useGetEquityQuery(path)
  const curves = Object.entries(equities ?? []).filter(([name, _]) => checked[path]?.includes(name))

  return (
    <Plot
      data={curves.map(([name, equity]) => ({
        name: name,
        x: Object.keys(equity),
        y: Object.values(equity),
        type: 'scatter',
        mode: 'lines',
      }))}
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
