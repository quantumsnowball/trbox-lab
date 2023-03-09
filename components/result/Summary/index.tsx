import { FileNode } from "@/common/types"
import { Box, Button } from "@mui/material"
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { FC } from "react"
import { byDirThenReverseName } from "@/components/common/utils"
import { layoutTempActions } from "@/redux/slices/layoutTemp";
import { RESULT_DIR_PREFIX } from "@/components/result/constants";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetResultTreeQuery } from "@/redux/slices/apiSlice";
import { RootState } from "@/redux/store";
import Card from "@/components/result/Summary/Card";
import Dir from "@/components/result/Summary/Dir";


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

const Summary: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes.at(-1)
  const entries = lastNode && lastNode.children

  return (
    <>
      <Box
        className='expanding scroll'
      >
        {
          entries && [...entries].sort(byDirThenReverseName).map(({ name, type, path }) =>
            name.startsWith(RESULT_DIR_PREFIX) ?
              <Card key={path} {...{ name, path }} />
              :
              <Dir key={path} {...{ name, type, path }} />
          )
        }
      </Box>
      <FileOpsBar />
    </>
  )
}
export default Summary

