import dynamic from "next/dynamic";
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


const PlotlyChart = () => {
  return (
    <Plot
      data={
        [
          {
            name: 'test',
            x: [1, 2, 3],
            y: [1, 2, 3],
            type: 'scatter',
            mode: 'lines',
          },
        ]
      }
      layout={{
        title: 'Study01',
        showlegend: true,
        legend: {
          x: 0,
          y: 1,
          yanchor: 'bottom',
          orientation: 'h',
        },
        yaxis: { side: 'right' },
      }}
      config={{
        responsive: true,
      }}
    />
  )
}
export default PlotlyChart
