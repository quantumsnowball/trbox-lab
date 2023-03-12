import { useGetMetricsQuery } from "@/redux/slices/apiSlice";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { FC } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { layoutTempActions } from "@/redux/slices/layoutTemp";


const SelectBar: FC<{ path: string }> = ({ path }) => {
  const dispatch = useDispatch()
  const order = useSelector((s: RootState) => s.layoutTemp.result.metrics.order)
  const sort = useSelector((s: RootState) => s.layoutTemp.result.metrics.sort)
  const { data: metrics } = useGetMetricsQuery({ path, sort, order })
  const options = metrics?.data?.map(row => row[0] as string) ?? []
  const checked = useSelector((s: RootState) => s.layoutTemp.result.equity.checked[path] ?? [])
  const setChecked = (checked: string[]) => dispatch(layoutTempActions.setEquityChecked({ path, checked }))

  return (
    <Autocomplete
      multiple
      sx={{ m: 1 }}
      options={options}
      disableCloseOnSelect
      value={checked}
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

export default SelectBar
