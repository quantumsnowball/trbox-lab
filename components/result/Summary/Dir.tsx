import { Box, Typography } from "@mui/material"
import { FC } from "react"
import { useRouter } from 'next/router'
import { RESULT_ROOT } from "@/components/result/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { DeleteButton, Icon } from "@/components/result/Summary/common";


const Dir: FC<{ name: string, type: string, path: string }> = ({ name, type, path }) => {
  const router = useRouter()
  const delMode = useSelector((s: RootState) => s.layoutTemp.result.fileOps.deleteMode)
  return (
    <Box
      className='flex row spread'
    >
      <Typography
        key={path}
        variant='h6'
        className='flex row start'
        sx={{ m: 1, p: 1, cursor: 'pointer' }}
        onClick={() => {
          router.push(RESULT_ROOT + path)
        }}
      >
        <Icon name={name} />{name}{type === 'folder' ? '/' : null}
      </Typography>
      {
        delMode ?
          <DeleteButton {...{ path }} />
          :
          null
      }
    </Box>
  )
}


export default Dir
