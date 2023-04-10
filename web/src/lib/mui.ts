import { Offside } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import createCache from '@emotion/cache'

export const offsideFont = Offside({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: offsideFont.style.fontFamily,
  },
})

export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true })
}
