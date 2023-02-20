import HomeIcon from '@mui/icons-material/Home';
import { FC, } from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';


const SUFFIX = '.py'

const Home = () => {
  return (
    <Typography
      variant='h6'
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
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
        {
          paths?.map((path, i) => {
            const name = slugs[i]
            return (
              <Typography
                key={path}
                variant='h6'
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <Icon name={name} />
                {name}
              </Typography>
            )
          })
        }
      </Breadcrumbs >
    </Box>
  )
}

export default BreadCrumbs
