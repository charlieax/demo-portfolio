import { Stack, Typography } from '@mui/material'

import { Grid } from '@components/Grid'

export function HomePage() {
  return (
    <Stack spacing={2} padding={2} height="100vh">
      <Typography variant="h2">Game Of Life</Typography>
      <Stack height="100%" justifyContent="center">
        <Grid />
      </Stack>
    </Stack>
  )
}
