import HomeIcon from '@mui/icons-material/Home';
import { FC, } from 'react';
import { Box, Breadcrumbs, Typography, useMediaQuery, useTheme } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useRouter } from 'next/router';
import { UpOneLevelButton } from '../common/buttons';
import { Node } from '@/common/types';


const ROOT = '/result'
const PREFIX = '.result'

const Icon: FC<{ name: string, path: string }> = ({ name, path }) =>
  // if no .py ext, consider a dir
  <>
    {path === '' ?
      <HomeIcon sx={{ mr: 1 }} fontSize="inherit" />
      : name.startsWith(PREFIX) ?
        <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
        <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const UpButton: FC<{ nodes: Node[] }> = ({ nodes }) => {
  const router = useRouter()
  const theme = useTheme()
  const isBig = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <>
      {
        (isBig && nodes.length > 1) ?
          <UpOneLevelButton
            onClick={() => {
              router.push(`${ROOT}${nodes?.at(-2)?.path}`)
            }}
          />
          :
          null
      }
    </>

  )
}

type Props = {
  nodes: Node[]
}

const BreadCrumbs = ({ nodes }: Props) => {
  const router = useRouter()

  return (
    <Box
      className='flex row spread'
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ m: 1, p: 1 }}
      >
        {
          nodes.map(({ name, path }) => {
            return (
              <Typography
                key={path}
                variant='h6'
                className='flex'
                sx={{ cursor: 'pointer' }}
                onClick={() => router.push(`${ROOT}${path}`)}
              >
                <Icon {...{ name, path }} />
                {name}
              </Typography>
            )
          })
        }
      </Breadcrumbs >
      <UpButton {...{ nodes }} />
    </Box>
  )
}

export default BreadCrumbs

