import { render } from '@testing-library/react'
import { vi } from 'vitest'

import { Grid } from './Grid'

const defaultProps = {
  nodes: [],
  onToggleNode: vi.fn(),
}

describe('Grid', () => {
  it('renders title', () => {
    render(<Grid {...defaultProps} />)
  })
})
