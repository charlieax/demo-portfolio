import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'

import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('renders hello', () => {
    render(<HomePage />)

    screen.debug()

    // check if App components renders headline
    expect(screen.getByText('Hello World')).toBeDefined()
  })
})
