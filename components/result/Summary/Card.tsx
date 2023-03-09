import { resultDirDatetimeFormatted } from "@/common/utils"
import { Box, Typography } from "@mui/material"
import { RESULT_ROOT } from "@/components/result/constants";
import { StrategyParams } from "@/redux/slices/apiSlice/types";
import { FC } from "react";
import { useGetMetaQuery } from "@/redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { RootState } from "@/redux/store";
import { DeleteButton, Icon } from "@/components/result/Summary/common";


const Card: FC<{ name: string, path: string }> = ({ name, path }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const viewMetrics = () => dispatch(layoutTempActions.goToResultSection('metrics'))
  const { data: meta } = useGetMetaQuery(path)
  const delMode = useSelector((s: RootState) => s.layoutTemp.result.fileOps.deleteMode)

  const Field: FC<{
    name: string | undefined,
    desc: string | number | undefined
  }> = ({ name, desc }) =>
      <Typography sx={{ fontFamily: 'monospace' }}>
        {name}: {desc}
      </Typography>

  const Params: FC<{ params: StrategyParams }> = ({ params }) =>
    <>
      <Field name='Parameters:' desc='' />
      <Box
        sx={{ pl: 3 }}
      >
        {
          Object.entries(params).map(([name, str]) =>
            <Field key={name} name={name} desc={str} />)
        }
      </Box>
    </>

  return (
    <Box
      className='flex row spread'
      key={name}
      sx={{ ml: 1, pl: 1, py: 1 }}
    >
      <Box>
        <Typography
          variant='h6'
          className='flex row start'
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            viewMetrics()
            router.push(RESULT_ROOT + path)
          }}
        >
          <Icon name={name} />
          {resultDirDatetimeFormatted(name)}
        </Typography>
        <Field name='source' desc={meta?.source} />
        <Field name='strategies' desc={meta?.strategies.length} />
        {
          meta?.params ?
            <Params params={meta.params} />
            :
            null
        }
      </Box>
      {
        delMode ?
          <DeleteButton {...{ path }} />
          :
          null
      }
    </Box>
  )
}

export default Card
