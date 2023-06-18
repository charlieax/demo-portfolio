import { render } from '@testing-library/react'

import { GameOfLifeModule } from './GameOfLifeModule'

describe('GameOfLifeModule', () => {
  it('renders title', () => {
    render(<GameOfLifeModule />)
  })
})
