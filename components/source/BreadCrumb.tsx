import HomeIcon from '@mui/icons-material/Home';
import { FC, } from 'react';
import { Box, Breadcrumbs, Typography, useMediaQuery, useTheme } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useRouter } from 'next/router';
import { UpOneLevelButton } from '../common/buttons';
import { Node } from '@/common/types';


const ROOT = '/source'
const SUFFIX = '.py'

const Icon: FC<{ name: string, path: string }> = ({ name, path }) =>
  // if no .py ext, consider a dir
  <>
    {path === '' ?
      <HomeIcon sx={{ mr: 1 }} fontSize="inherit" />
      : name.endsWith(SUFFIX) ?
        <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
        <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const PathBar: FC<{ nodes: Node[] }> = ({ nodes }) => {
  const router = useRouter()

  return (
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
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => router.push(`${ROOT}${path}`)}
            >
              <Icon {...{ name, path }} />
              {name}
            </Typography>
          )
        })
      }
    </Breadcrumbs >
  )
}
const UpButton: FC<{ paths: string[] }> = ({ paths }) => {
  const router = useRouter()
  const theme = useTheme()
  const isBig = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <>
      {
        (isBig && paths.length > 0) ?
          <UpOneLevelButton
            onClick={() => {
              paths.length === 1 ?
                router.push(ROOT) :
                router.push(`${ROOT}${paths?.at(-2)}`)
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
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <PathBar {...{ nodes }} />
    </Box>
  )
}

export default BreadCrumbs
