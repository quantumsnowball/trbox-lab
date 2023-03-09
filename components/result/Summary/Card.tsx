import { resultDirDatetimeFormatted } from "@/common/utils"
import { Box, Chip, Typography } from "@mui/material"
import { RESULT_ROOT } from "@/components/result/constants";
import { StrategyParams } from "@/redux/slices/apiSlice/types";
import { FC } from "react";
import { useGetMetaQuery } from "@/redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { RootState } from "@/redux/store";
import { DeleteButton, Icon } from "@/components/result/Summary/common";
import DataObjectIcon from '@mui/icons-material/DataObject';
import ViewModuleIcon from '@mui/icons-material/ViewModule';


const Heading: FC<{ name: string, path: string }> = ({ name, path }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const viewMetrics = () => dispatch(layoutTempActions.goToResultSection('metrics'))

  return (
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
  )
}

const SourceFileName: FC<{ name: string | undefined, path: string }> = ({ name, path }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const viewMetrics = () => dispatch(layoutTempActions.goToResultSection('metrics'))
  return (
    <Chip
      icon={<DataObjectIcon />}
      label={name}
      variant='outlined'
      color='primary'
      sx={{ fontFamily: 'monospace' }}
      onClick={() => {
        viewMetrics()
        router.push(RESULT_ROOT + path)
      }}
    />
  )
}

const StrategyCount: FC<{ length: number | undefined, path: string }> = ({ length, path }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const viewMetrics = () => dispatch(layoutTempActions.goToResultSection('metrics'))
  return (
    <Chip
      icon={<ViewModuleIcon />}
      label={`strategies: ${length}`}
      variant='outlined'
      color='success'
      sx={{ fontFamily: 'monospace' }}
      onClick={() => {
        viewMetrics()
        router.push(RESULT_ROOT + path)
      }}
    />
  )
}


const Parameters: FC<{ params?: StrategyParams }> = ({ params }) => {
  const mode = useSelector((s: RootState) => s.theme.mode)

  const Field: FC<{
    name: string | undefined,
    desc: string | number | undefined
  }> = ({ name, desc }) =>
      <Box
        sx={{
          mx: 2,
        }}
      >
        <Typography
          className='nowrap'
          sx={{
            display: 'inline',
            fontFamily: 'monospace',
          }}
        >
          {`${name} = `}
        </Typography>
        <Typography
          sx={{
            display: 'inline',
            fontFamily: 'monospace',
            color: mode === 'light' ? 'warning.main' : 'warning.light',
          }}
        >
          {desc}
        </Typography>
      </Box>

  return (
    <>
      {
        params ?
          <Box
            className='flex row start'
            sx={{
              flexWrap: 'wrap',
            }}
          >
            {
              Object.entries(params).map(([name, str]) =>
                <Field
                  key={name}
                  name={name}
                  desc={str}
                />)
            }
          </Box>
          :
          null
      }
    </>
  )
}

const Card: FC<{ name: string, path: string }> = ({ name, path }) => {
  const { data: meta } = useGetMetaQuery(path)
  const delMode = useSelector((s: RootState) => s.layoutTemp.result.fileOps.deleteMode)

  return (
    <Box
      className='flex row spread'
      key={name}
      sx={{ ml: 1, p: 1 }}
    >
      <Box
        className='expanding'
      >
        <Heading {...{ name, path }} />
        <Box
          className='flex row spread'
          sx={{ my: 1 }}
        >
          <SourceFileName name={meta?.source} path={path} />
          <StrategyCount length={meta?.strategies.length} path={path} />
        </Box>
        <Parameters params={meta?.params} />
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
