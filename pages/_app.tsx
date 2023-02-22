import MenuBar from '@/components/MenuBar'
import ReduxWrapper from '@/redux/wrapper'
import '@/styles/globals.css'
import ThemeWrapper from '@/styles/wrapper'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


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
          <title>Trbox - Lab</title>
          <meta name="description" content="Trbox Lab" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div
          id='app-div'
          className='full scroll flex column'
        >
          <MenuBar />
          <div
            id='main-div'
            className='full scroll flex column'
          >
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeWrapper>
    </ReduxWrapper>
  )
}

export default App
