import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useGetMarksIndexQuery, useLazyGetMarkSeriesQuery } from "@/redux/slices/apiSlice"
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
  const [trigger,] = useLazyGetMarkSeriesQuery()
  const studyMode: StudyPlotMode = useSelector((s: RootState) => s.layoutTemp.result.study.mode[path]?.[strategy]?.[name] ?? null)
  const addMainSeries = (data: Data) => dispatch(contentActions.addPlotlyChartSeries({ path, strategy, name, target: 'main', data }))
  const addSub1Series = (data: Data) => dispatch(contentActions.addPlotlyChartSeries({ path, strategy, name, target: 'sub1', data }))
  const removeMainSeries = () => dispatch(contentActions.removePlotlyChartSeries({ path, strategy, name, target: 'main' }))
  const removeSubSeries = () => dispatch(contentActions.removePlotlyChartSeries({ path, strategy, name, target: 'sub1' }))

  useEffect(() => {
    (async () => {
      if (studyMode === null) {
        removeMainSeries()
        removeSubSeries()
        return
      }
      let { data } = await trigger({ path, strategy, name })
      if (data) {
        const x = data.map(r => r[0])
        const y = data.map(r => r[1])
        const type = 'scatter'
        const mode = 'lines'
        const xaxis = 'x'
        if (studyMode === 'main') {
          addMainSeries({ name, x, y, type, mode, xaxis, yaxis: 'y1' })
          removeSubSeries()
        }
        else if (studyMode === 'sub1') {
          addSub1Series({ name, x, y, type, mode, xaxis, yaxis: 'y2' })
          removeMainSeries()
        }
      }
    })()
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

