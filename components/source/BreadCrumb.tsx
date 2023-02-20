import HomeIcon from '@mui/icons-material/Home';
import { FC, } from 'react';
import { Box, Breadcrumbs, Typography, useMediaQuery, useTheme } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useRouter } from 'next/router';
import { UpOneLevelButton } from '../common/buttons';


const ROOT = '/source'
const SUFFIX = '.py'

const Home = () => {
  const router = useRouter()

  return (
    <Typography
      variant='h6'
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      onClick={() => router.push(ROOT)}
    >
      <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    </Typography>
  )
}

const Icon: FC<{ name: string }> = ({ name }) =>
  // if no .py ext, consider a dir
  <>
    {name.endsWith(SUFFIX) ?
      <DataObjectIcon sx={{ mr: 1 }} fontSize="inherit" /> :
      <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />}
  </>

const PathBar: FC<{ slugs: string[], paths: string[] }> = ({ slugs, paths }) => {
  const router = useRouter()

  return (
    <>
      {
        paths?.map((path, i) => {
          const name = slugs[i]
          return (
            <Typography
              key={path}
              variant='h6'
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => router.push(`${ROOT}${path}`)}
            >
              <Icon name={name} />
              {name}
            </Typography>
          )
        })
      }
    </>

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
  slugs: string[]
  paths: string[]
}

const BreadCrumbs = ({ slugs, paths }: Props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ m: 1, p: 1 }}
      >
        <Home />
        <PathBar {...{ slugs, paths }} />
      </Breadcrumbs >
      <UpButton {...{ paths }} />
    </Box>
  )
}

export default BreadCrumbs
