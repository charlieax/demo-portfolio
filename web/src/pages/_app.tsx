import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

import { createEmotionCache, theme } from '@lib/mui'

const clientSideEmotionCache = createEmotionCache()

interface Props extends AppProps {
  emotionCache?: EmotionCache
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: Props) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width-device-width"
            />
          </Head>
          <DefaultSeo
            defaultTitle="Charlie Axtell"
            titleTemplate="%s - Charlie Axtell"
          />
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
    </CacheProvider>
  )
}
