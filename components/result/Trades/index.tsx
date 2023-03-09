import { FileNode } from "@/common/types";
import { useGetMetaQuery, useGetMetricsQuery } from "@/redux/slices/apiSlice";
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { RootState } from "@/redux/store";
import {
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Stats from "./Stats";
import TradeList from "./TradeList";


const Tabbed: FC<{ path: string | undefined }> = ({ path }) => {
  const { data: meta } = useGetMetaQuery(path ?? '')
  const strategies = meta?.strategies
  const [tabId, setTabId] = useState(0)

  return (
    <>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={tabId}
        onChange={(_, newId) => setTabId(newId)}
      >
        {
          strategies?.map(name =>
            <Tab
              key={name}
              label={name}
              sx={{ textTransform: 'none' }}
            />
          )
        }
      </Tabs>
      {
        path && strategies &&
        <>
          <TradeList path={path} strategy={strategies[tabId]} />
          <Stats path={path} strategy={strategies[tabId]} />
        </>
      }
    </>
  )
}

const FilterBox: FC<{ path: string }> = ({ path }) => {
  const dispatch = useDispatch()
  const order = useSelector((s: RootState) => s.layoutTemp.result.metrics.order)
  const sort = useSelector((s: RootState) => s.layoutTemp.result.metrics.sort)
  const { data: metrics } = useGetMetricsQuery({ path, sort, order })
  const options = metrics?.data?.map(row => row[0] as string) ?? []
  const selected = useSelector((s: RootState) => s.layoutTemp.result.trades.selected[path])
  const setSelected = (selected: string) => dispatch(layoutTempActions.setTradesSelected({ path, selected }))

  return (
    <Autocomplete
      sx={{ my: 1 }}
      disablePortal
      options={options}
      defaultValue={selected}
      renderInput={params =>
        <TextField
          label='Trades'
          placeholder='Search and select strategies'
          {...params}
        />
      }
      onChange={(_e, selection, _reason) => {
        selection && setSelected(selection)
      }}
    />
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
          <Tabbed {...{ path }} />
        </>
        :
        null
      }
    </Box>
  )
}

export default Trades

