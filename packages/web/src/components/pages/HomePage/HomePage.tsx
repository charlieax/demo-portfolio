import { Stack, Typography } from '@mui/material'

import { GameOfLifeModule } from '@components/GameOfLifeModule'

export function HomePage() {
  return (
    <Stack spacing={4} padding={2} height="100vh">
      <Typography variant="h2">Game Of Life</Typography>
      <Stack height="100%" alignItems="center">
        <GameOfLifeModule />
      </Stack>
    </Stack>
  )
}
