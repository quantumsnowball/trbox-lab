import { Button, styled, Typography } from "@mui/material";
import Link from "next/link";

const ContentDiv = styled('div')`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export default function NotFound() {
  return (
    <ContentDiv id='content-div'>
      <Typography variant="h5">
        <code>{window.location.pathname}</code> not found
      </Typography>
      <Button variant="outlined">
        <Link href='/'> GO HOME </Link>
      </Button>
    </ContentDiv>
  )
}
