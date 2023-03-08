import { FileNode } from "@/common/types";
import { useGetEquityQuery, useGetMetaQuery } from "@/redux/slices/apiSlice";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { FC } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import Plot from "react-plotly.js";


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

const PlotlyChart: FC<{ path: string }> = ({ path }) => {
  const checked = useSelector((s: RootState) => s.layoutTemp.result.equity.checked)
  const { data: equities } = useGetEquityQuery(path)
  const curves = Object.entries(equities ?? []).filter(([name, _]) => checked.includes(name))

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
        title: 'Equity Curves',
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
            <PlotlyChart {...{ path }} />
          </>
          :
          null
      }
    </Box>
  )
}

export default Equity
