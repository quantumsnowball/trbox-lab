import { FileNode } from "@/common/types";
import { useGetMetricsQuery } from "@/redux/slices/apiSlice";
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { RootState } from "@/redux/store";
import {
  Autocomplete,
  Box,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Stats from "./Stats";
import TradeList from "./TradeList";


const FilterBox: FC<{ path: string }> = ({ path }) => {
  const dispatch = useDispatch()
  const order = useSelector((s: RootState) => s.layoutTemp.result.metrics.order)
  const sort = useSelector((s: RootState) => s.layoutTemp.result.metrics.sort)
  const { data: metrics } = useGetMetricsQuery({ path, sort, order })
  const options = metrics?.data?.map(row => row[0] as string) ?? []
  const selected = useSelector((s: RootState) => s.layoutTemp.result.trades.selected[path] ?? null)
  const setSelected = (selected: string | null) => dispatch(layoutTempActions.setTradesSelected({ path, selected }))

  return (
    <Autocomplete
      sx={{ my: 1 }}
      disablePortal
      options={options}
      value={selected}
      renderInput={params =>
        <TextField
          label='Trade Log'
          placeholder='Search and select strategies'
          {...params}
        />
      }
      onChange={(_e, selection, _reason) => {
        setSelected(selection)
      }}
    />
  )
}

const Content: FC<{ path: string }> = ({ path }) => {
  const selected = useSelector((s: RootState) => s.layoutTemp.result.trades.selected[path])

  return (
    <>
      {selected ?
        <>
          <TradeList path={path} strategy={selected} />
          <Stats path={path} strategy={selected} />
        </>
        :
        null
      }
    </>

  )
}

const Trades: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path

  return (
    <Box
      className='expanding scroll flex column start stretch'
    >
      {path ?
        <>
          <FilterBox {...{ path }} />
          <Content {...{ path }} />
        </>
        :
        null
      }
    </Box>
  )
}

export default Trades

