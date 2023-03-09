import { Box, Button } from "@mui/material"
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { FC } from "react"
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetResultTreeQuery } from "@/redux/slices/apiSlice";
import { RootState } from "@/redux/store";


const FileOpsBar: FC = () => {
  const dispatch = useDispatch()
  const delMode = useSelector((s: RootState) => s.layoutTemp.result.fileOps.deleteMode)
  const toggleDelMode = () => dispatch(layoutTempActions.toggleResultFileDeleteMode())
  const [trigger,] = useLazyGetResultTreeQuery()
  return (
    <Box
      className='flex row end'
    >
      <Button
        startIcon={<SyncOutlinedIcon />}
        onClick={() => trigger()}
      >
        Refresh
      </Button>
      <Button
        color={delMode ? 'secondary' : 'error'}
        startIcon={delMode ? <CancelOutlinedIcon /> : <DeleteOutlinedIcon />}
        onClick={toggleDelMode}
      >
        {delMode ? 'Cancel' : 'Delete'}
      </Button>
    </Box>
  )
}

export default FileOpsBar
