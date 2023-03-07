import { FileNode } from "@/common/types";
import { useGetMetaQuery } from "@/redux/slices/apiSlice";
import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import { FC, useState } from "react";
import Stats from "./Stats";
import TradeList from "./TradeList";


const Tabbed: FC<{ path: string | undefined }> = ({ path }) => {
  const { data: meta } = useGetMetaQuery(path ?? '')
  const strategies = meta?.strategies
  const [tabId, setTabId] = useState(0)

  return (
    <>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={tabId}
        onChange={(_, newId) => setTabId(newId)}
      >
        {
          strategies?.map(name =>
            <Tab
              key={name}
              label={name}
              sx={{ textTransform: 'none' }}
            />
          )
        }
      </Tabs>
      {
        path && strategies &&
        <>
          <TradeList path={path} strategy={strategies[tabId]} />
          <Stats />
        </>
      }
    </>
  )
}

const Trades: FC<{ nodes: FileNode[] }> = ({ nodes }) => {
  const lastNode = nodes?.at(-1)
  const path = lastNode?.path

  return (
    <Box
      className='expanding scroll flex column start stretch'
    >
      <Tabbed {...{ path }} />
    </Box>
  )
}

export default Trades

