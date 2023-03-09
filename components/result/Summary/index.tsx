import { FileNode } from "@/common/types"
import { Box } from "@mui/material"
import { FC } from "react"
import { byDirThenReverseName } from "@/components/common/utils"
import { RESULT_DIR_PREFIX } from "@/components/result/constants";
import Card from "@/components/result/Summary/Card";
import Dir from "@/components/result/Summary/Dir";
import FileOpsBar from "@/components/result/Summary/FileOpsBar";


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

