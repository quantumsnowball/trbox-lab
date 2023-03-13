import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useGetMarksIndexQuery, useLazyGetMarkSeriesOverlayQuery, useLazyGetMarkSeriesQuery } from "@/redux/slices/apiSlice"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { contentActions, StudyPlotMode } from "@/redux/slices/content";
import { Data } from "plotly.js";
import ControlButtons from "./ControlButtons";


const Row: FC<{ path: string, strategy: string, name: string }> = ({ path, strategy, name }) => {
  const dispatch = useDispatch()
  const [getMarkSeries,] = useLazyGetMarkSeriesQuery()
  const [getMarkSeriesOverlay,] = useLazyGetMarkSeriesOverlayQuery()
  const studyMode: StudyPlotMode = useSelector((s: RootState) => s.layoutTemp.result.study.mode[path]?.[strategy]?.[name] ?? null)
  const firstMainSeriesName = useSelector((s: RootState) => Object.keys(s.content.result.study.series[path]?.[strategy]?.main)[0] ?? null)
  const addMainSeries = (data: Data) => dispatch(contentActions.addPlotlyChartSeries({ path, strategy, name, target: 'main', data }))
  const addSub1Series = (data: Data) => dispatch(contentActions.addPlotlyChartSeries({ path, strategy, name, target: 'sub1', data }))
  const addSub2Series = (data: Data) => dispatch(contentActions.addPlotlyChartSeries({ path, strategy, name, target: 'sub2', data }))
  const addOverlaySeries = (data: Data) => dispatch(contentActions.addPlotlyChartSeries({ path, strategy, name, target: 'overlay', data }))
  const removeMainSeries = () => dispatch(contentActions.removePlotlyChartSeries({ path, strategy, name, target: 'main' }))
  const removeSub1Series = () => dispatch(contentActions.removePlotlyChartSeries({ path, strategy, name, target: 'sub1' }))
  const removeSub2Series = () => dispatch(contentActions.removePlotlyChartSeries({ path, strategy, name, target: 'sub2' }))
  const removeOverlaySeries = () => dispatch(contentActions.removePlotlyChartSeries({ path, strategy, name, target: 'overlay' }))

  useEffect(() => {
    (async () => {
      if (studyMode === null) {
        removeMainSeries()
        removeSub1Series()
        removeSub2Series()
        removeOverlaySeries()
        return
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
            addOverlaySeries({ name, x, y, type, mode, xaxis, yaxis: 'y1' })
            removeMainSeries()
            removeSub1Series()
            removeSub2Series()
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
            addMainSeries({ name, x, y, type, mode, xaxis, yaxis: 'y1' })
            removeSub1Series()
            removeSub2Series()
            removeOverlaySeries()
          }
          else if (studyMode === 'sub1') {
            addSub1Series({ name, x, y, type, mode, xaxis, yaxis: 'y2' })
            removeMainSeries()
            removeSub2Series()
            removeOverlaySeries()
          }
          else if (studyMode === 'sub2') {
            addSub2Series({ name, x, y, type, mode, xaxis, yaxis: 'y3' })
            removeMainSeries()
            removeSub1Series()
            removeOverlaySeries()
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

const MarksDrawer: FC<{ path: string, strategy: string }> = ({ path, strategy }) => {
  const { data: index } = useGetMarksIndexQuery(path)
  const [expanded, setExpanded] = useState(true)

  return (
    <Accordion
      disableGutters
      expanded={expanded}
      onChange={() => setExpanded(prev => !prev)}
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandLessIcon />}
      >
        <Typography
          variant='h6'
        >
          Marks
        </Typography>
      </AccordionSummary>
      {index && index[strategy] &&
        <AccordionDetails>
          {
            index[strategy].map(name =>
              <Row key={name} {...{ path, strategy, name }} />
            )
          }
        </AccordionDetails>
      }
    </Accordion >
  )
}

export default MarksDrawer

