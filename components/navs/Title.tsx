import { RootState } from "@/redux/store"
import { Typography } from "@mui/material"
import { useSelector } from "react-redux"

const TitleSection = () => {
  const equityValue = useSelector((s: RootState) => s.contentTemp.equityCurve.value)

  return (
    <>
      <Typography variant='h5'>Equity Curve</Typography>
      {
        equityValue ?
          <Typography variant='h6'>
            {equityValue}
          </Typography>
          : null
      }
    </>
  )
}
export default TitleSection
