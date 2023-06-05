import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'

import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('renders title', () => {
    render(<HomePage />)
    expect(screen.getByText('Game Of Life')).toBeDefined()
  })
})
