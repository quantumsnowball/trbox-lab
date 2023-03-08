import { FileNode } from "@/common/types";
import { randomRGB } from "@/common/utils";
import { useGetEquityQuery, useGetMetaQuery } from "@/redux/slices/apiSlice";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { createChart, IChartApi } from "lightweight-charts";
import { FC, useEffect, useRef } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { layoutTempActions } from "@/redux/slices/layoutTemp";


const SelectBar: FC<{ path: string }> = ({ path }) => {
  const dispatch = useDispatch()
  const { data: meta } = useGetMetaQuery(path)
  const options = meta?.strategies ?? []
  const setChecked = (ls: string[]) => dispatch(layoutTempActions.setEquityChecked(ls))

  return (
    <Autocomplete
      multiple
      sx={{ my: 1 }}
      options={options}
      disableCloseOnSelect
      getOptionLabel={option => option}
      renderOption={(props, option, { selected: checked }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={checked}
          />
          {option}
        </li>
      )}
      renderInput={params =>
        <TextField
          label='Equity Curves'
          placeholder='Search and select equity curves'
          {...params}
        />
      }
      onChange={(_e, selections, _reason) => {
        setChecked(selections)
      }}
    />
  )
}

const Content: FC<{ path: string }> = ({ path }) => {
  const { data: equities } = useGetEquityQuery(path)
  const ctnRef = useRef<HTMLDivElement | null>(null)
  const chart = useRef<IChartApi | null>(null)
  const checked = useSelector((s: RootState) => s.layoutTemp.result.equity.checked)

  useEffect(() => {
    if (!equities)
      return
    // create chart only if not already exists
    if (chart.current)
      return
    // create chart
    chart.current = createChart(ctnRef?.current ?? '', {
      autoSize: true,
      localization: {
        timeFormatter: (ts: number) => new Date(ts * 1e3).toISOString().replace('T', ' ').slice(0, -5)
      },
    });
    console.debug('chart created')
    // add data
    Object.entries(equities)
      .filter(([name, _]) => checked.includes(name))
      .forEach(([_name, equity]) => {
        // create series
        const series = chart.current?.addLineSeries({
          color: randomRGB()
        });
        // add data
        const equityParsed = Object.entries(equity).map(([time, value]) =>
          ({ time: Date.parse(time) / 1000, value }))
        //@ts-ignore
        series?.setData(equityParsed);
        // customization
        series?.applyOptions({
          priceFormat: { type: 'volume', precision: 2, }
        })
        console.debug('series data injected')
      })
    // chart.current.timeScale().fitContent()
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
      {
        path ?
          <>
            <SelectBar {...{ path }} />
            <Content {...{ path }} />
          </>
          :
          null
      }
    </Box>
  )
}

export default Equity
