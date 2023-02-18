import { RootState } from "@/redux/store"
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material"
import { FC, PropsWithChildren, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"

const defaultTheme = createTheme()

const elementary = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
      }
      : {
        // palette values for dark mode
        background: {
          default: '#303030',
          paper: '#424242',
        },
      }),
  },
})

const ThemeWrapper: FC<PropsWithChildren> = ({ children }) => {
  const mode = useSelector((s: RootState) => s.theme.mode)
  const theme = useCallback(() => createTheme(elementary(mode)), [mode,])

  useEffect(() => {
    document.body.style.backgroundColor = theme().palette.background.default
  }, [theme])

  return (
    <ThemeProvider theme={defaultTheme} >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeProvider>
  )
}

export default ThemeWrapper
