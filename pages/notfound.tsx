import { Button, Typography } from "@mui/material";
import Link from "next/link";


export default function NotFound() {
  return (
    <div
      id='content-div'
      className='full flex column'
    >
      <Typography variant="h5">
        <code>{window.location.pathname}</code> not found
      </Typography>
      <Button variant="outlined">
        <Link href='/'> GO HOME </Link>
      </Button>
    </div>
  )
}
