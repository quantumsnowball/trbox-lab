import MenuBar from '@/components/MenuBar'
import ReduxWrapper from '@/redux/wrapper'
import '@/styles/globals.css'
import ThemeWrapper from '@/styles/wrapper'
import { styled } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/*
 * 
 * AppDiv - 100% height
 *   Header
 *   MainDiv - 100% height
 *     ContentDiv(s) - scrollable, 100% height
 *       ItemDiv
 *   Footer
 *
 */

const AppDiv = styled('div')`
  /* take all vertical space */
  height: 100%;
  /* single item each row */
  display: flex;
  flex-flow: column;
`;

const MainDiv = styled('div')`
  /* take all vertical space */
  flex: 1 1 auto;
  /* single item each row */
  display: flex;
  flex-flow: column;
  /* align vertically */
  justify-content: flex-start;
  /* align horizontally */
  /* align-items: center; */
  /* scrollable  inside */
  overflow: auto;
`;

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    try {
      // F5 refresh a pathname will land on same client side page
      router.push(window.location.pathname)
      // BUG when typed in a wrong url, yield the following error in dev mode:
      // Error: Invariant: attempted to hard navigate to the same URL
    } catch (err) {
      // TODO can't really catch the not found error 
      console.log(err)
      router.replace('/notfound')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReduxWrapper>
      <ThemeWrapper>
        <Head>
          <title>Trbox - Console</title>
          <meta name="description" content="Trbox Console" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppDiv id='app-div'>
          <MenuBar />
          <MainDiv id='main-div'>
            <Component {...pageProps} />
          </MainDiv>
        </AppDiv>
      </ThemeWrapper>
    </ReduxWrapper>
  )
}

export default App
