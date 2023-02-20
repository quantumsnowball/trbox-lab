import BreadCrumbs from "@/components/results/BreadCrumb";
import { useGetResultMetaQuery } from "@/redux/slices/apiSlice"
import { Paper, styled, Typography } from "@mui/material"
import { FC } from "react"

const ContentDiv = styled('div')`
  /* take all vertical space */
  flex: 1 1 auto;
  /* single item each row */
  display: flex;
  flex-flow: column;
  /* align vertically */
  justify-content: flex-start;
  /* align horizontally */
  align-items: center;
`;


type Props = {
  path: string
}

const MetaSummary: FC<Props> = ({ path }) => {
  const { data } = useGetResultMetaQuery(path)

  return (
    <ContentDiv>
      <Paper
        sx={{
          width: '100%',
        }}>
        <BreadCrumbs />
        {data && Object.entries(data).map(([k, v]) => {
          return (
            <Typography>
              `${k}={v}`
            </Typography>
          )
        })}
      </Paper>
    </ContentDiv>
  )
}

export default MetaSummary
