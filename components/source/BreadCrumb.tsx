import HomeIcon from '@mui/icons-material/Home';
import { FC, } from 'react';
import { Box, Breadcrumbs, Typography, useMediaQuery, useTheme } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useRouter } from 'next/router';
import { RefreshButton, UpOneLevelButton } from '../common/buttons';
import { FileNode } from '@/common/types';
import { useDispatch } from 'react-redux';
import { layoutTempActions } from '@/redux/slices/layoutTemp';
import { SOURCE_FILE_SUFFIX, SOURCE_ROOT } from './constants';
import { useLazyGetSourceTreeQuery } from '@/redux/slices/apiSlice';


const Icon: FC<{ name: string, path: string }> = ({ name, path }) =>
  // if no .py ext, consider a dir
  <>
    {path === '' ?
      <HomeIcon sx={{ mr: 1 }} fontSize="inherit" />
      : name.endsWith(SOURCE_FILE_SUFFIX) ?
        <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
        <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const Refresh: FC = () => {
  const [trigger,] = useLazyGetSourceTreeQuery()
  return (
    <RefreshButton onClick={() => trigger()} />
  )
}

const Up: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()
  const isBig = useMediaQuery(theme.breakpoints.up('sm'))
  const viewFiles = () => dispatch(layoutTempActions.goToSourceSection('files'))

  return (
    <>
      {
        (isBig && nodes.length > 1) ?
          <UpOneLevelButton
            onClick={() => {
              router.push(`${SOURCE_ROOT}${nodes?.at(-2)?.path}`)
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
  const viewFiles = () => dispatch(layoutTempActions.goToSourceSection('files'))

  return (
    <Box
      className='flex row spread'
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
                  if (!name.endsWith(SOURCE_FILE_SUFFIX)) {
                    router.push(`${SOURCE_ROOT}${path}`)
                    viewFiles()
                  }
                }}
              >
                <Icon {...{ name, path }} />
                {name}
              </Typography>
            )
          })
        }
      </Breadcrumbs >
      <Up {...{ nodes }} />
      <Refresh />
    </Box>
  )
}

export default BreadCrumbs
