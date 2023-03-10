import { FileNode } from "@/common/types"
import { useGetMetricsQuery } from "@/redux/slices/apiSlice"
import { layoutTempActions } from "@/redux/slices/layoutTemp"
import { RootState } from "@/redux/store"
import { Autocomplete, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import Marks from "./Marks"


const FilterBox: FC<{ path: string }> = ({ path }) => {
  const dispatch = useDispatch()
  const order = useSelector((s: RootState) => s.layoutTemp.result.metrics.order)
  const sort = useSelector((s: RootState) => s.layoutTemp.result.metrics.sort)
  const { data: metrics } = useGetMetricsQuery({ path, sort, order })
  const options = metrics?.data?.map(row => row[0] as string) ?? []
  const selected = useSelector((s: RootState) => s.layoutTemp.result.study.selected[path] ?? null)
  const setSelected = (selected: string | null) => dispatch(layoutTempActions.setStudySelected({ path, selected }))

  return (
    <Autocomplete
      sx={{ m: 1 }}
      disablePortal
      options={options}
      value={selected}
      renderInput={params =>
        <TextField
          label='Study'
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
  const strategy = useSelector((s: RootState) => s.layoutTemp.result.study.selected[path])

  return (
    <>
      {strategy ?
        <>
          <Box className='expanding flex column center'>
            <Typography variant='h6'>
              Chart
            </Typography>
          </Box>
          <Marks path={path} strategy={strategy} />
        </>
        :
        null
      }
    </>
  )
}

const Study: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
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

export default Study
