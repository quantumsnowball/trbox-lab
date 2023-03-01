import HomeIcon from '@mui/icons-material/Home';
import { FC, } from 'react';
import { Box, Breadcrumbs, Typography, useMediaQuery, useTheme } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useRouter } from 'next/router';
import { UpOneLevelButton } from '../common/buttons';
import { FileNode } from '@/common/types';
import { layoutTempActions } from '@/redux/slices/layoutTemp';
import { useDispatch } from 'react-redux';
import { RESULT_DIR_PREFIX, RESULT_ROOT } from './constants';
import { resultDirDatetimeFormatted } from '@/common/utils';


const Icon: FC<{ name: string, path: string }> = ({ name, path }) =>
  // if no .py ext, consider a dir
  <>
    {path === '' ?
      <HomeIcon sx={{ mr: 1 }} fontSize="inherit" />
      : name.startsWith(RESULT_DIR_PREFIX) ?
        <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
        <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const Name: FC<{ name: string }> = ({ name }) =>
  <>
    {
      name.startsWith(RESULT_DIR_PREFIX) ?
        resultDirDatetimeFormatted(name)
        : name
    }
  </>

const Up: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()
  const isBig = useMediaQuery(theme.breakpoints.up('sm'))
  const viewFiles = () => dispatch(layoutTempActions.goToResultSection('files'))

  return (
    <>
      {
        (isBig && nodes.length > 1) ?
          <UpOneLevelButton
            onClick={() => {
              router.push(`${RESULT_ROOT}${nodes?.at(-2)?.path}`)
              viewFiles()
            }}
          />
          :
          null
      }
    </>

  )
}

type Props = {
  nodes: FileNode[]
}

const BreadCrumbs = ({ nodes }: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const viewFiles = () => dispatch(layoutTempActions.goToResultSection('files'))

  return (
    <Box
      className='flex row spread'
      sx={{ minHeight: 40 }}
    >
      <Breadcrumbs
        className='expanding'
        aria-label="breadcrumb"
        sx={{ ml: 2 }}
      >
        {
          nodes.map(({ name, path }) => {
            return (
              <Typography
                key={path}
                variant='h6'
                className='flex'
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (!name.startsWith(RESULT_DIR_PREFIX)) {
                    router.push(`${RESULT_ROOT}${path}`)
                    viewFiles()
                  }
                }}
              >
                <Icon {...{ name, path }} />
                <Name {...{ name }} />
              </Typography>
            )
          })
        }
      </Breadcrumbs >
      <Up {...{ nodes }} />
    </Box>
  )
}

export default BreadCrumbs

