import { Box, Typography } from "@mui/material"
import { FC, useEffect } from "react"
import { useLazyGetMarkSeriesOverlayQuery, useLazyGetMarkSeriesQuery } from "@/redux/slices/apiSlice"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { contentActions, PlotTarget, StudyPlotMode } from "@/redux/slices/content";
import { Data } from "plotly.js";
import ControlButtons from "./ControlButtons";


const Row: FC<{ path: string, strategy: string, name: string }> = ({ path, strategy, name }) => {
  const dispatch = useDispatch()
  const [getMarkSeries,] = useLazyGetMarkSeriesQuery()
  const [getMarkSeriesOverlay,] = useLazyGetMarkSeriesOverlayQuery()
  const studyMode: StudyPlotMode = useSelector((s: RootState) => s.layoutTemp.result.study.mode[path]?.[strategy]?.[name] ?? null)
  const firstMainSeriesName = useSelector((s: RootState) => Object.keys(s.content.result.study.series[path]?.[strategy]?.main ?? {})[0] ?? null)
  const addSeries = (target: PlotTarget) => (data: Data) =>
    dispatch(contentActions.addPlotlyChartSeries({ path, strategy, name, target, data }))
  const removeSeries = (target: PlotTarget) => () =>
    dispatch(contentActions.removePlotlyChartSeries({ path, strategy, name, target }))

  useEffect(() => {
    (async () => {
      if (studyMode === null) {
        (['main', 'sub1', 'sub2', 'overlay'] as PlotTarget[]).forEach(m => removeSeries(m)())
      }
      else if (studyMode === 'overlay') {
        const interp = firstMainSeriesName
        if (interp) {
          let { data } = await getMarkSeriesOverlay({ path, strategy, name, interp })
          if (data) {
            const x = data.map(r => r[0])
            const y = data.map(r => r[1])
            const type = 'scatter'
            const mode = 'markers'
            const xaxis = 'x'
            addSeries('overlay')({ name, x, y, type, mode, xaxis, yaxis: 'y1', marker: { size: 10 } });
            (['main', 'sub1', 'sub2'] as PlotTarget[]).forEach(m => removeSeries(m)())
          }
        }
      }
      else {
        let { data } = await getMarkSeries({ path, strategy, name })
        if (data) {
          const x = data.map(r => r[0])
          const y = data.map(r => r[1])
          const type = 'scatter'
          const mode = 'lines'
          const xaxis = 'x'
          if (studyMode === 'main') {
            addSeries('main')({ name, x, y, type, mode, xaxis, yaxis: 'y1' });
            (['sub1', 'sub2', 'overlay'] as PlotTarget[]).forEach(m => removeSeries(m)())
          }
          else if (studyMode === 'sub1') {
            addSeries('sub1')({ name, x, y, type, mode, xaxis, yaxis: 'y2' });
            (['main', 'sub2', 'overlay'] as PlotTarget[]).forEach(m => removeSeries(m)())
          }
          else if (studyMode === 'sub2') {
            addSeries('sub2')({ name, x, y, type, mode, xaxis, yaxis: 'y3' });
            (['main', 'sub1', 'overlay'] as PlotTarget[]).forEach(m => removeSeries(m)())
          }
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyMode])

  return (
    <Box
      className='flex row spread'
    >
      <Box
        className='flex row'
      >
        {studyMode === null ?
          <VisibilityOffOutlinedIcon sx={{ mr: 1 }} color='error' />
          :
          <VisibilityOutlinedIcon sx={{ mr: 1 }} color='success' />
        }
        <Typography>
          {name}
        </Typography>
      </Box>
      {<ControlButtons {...{ path, strategy, name }} />}
    </Box>
  )
}

export default Row

