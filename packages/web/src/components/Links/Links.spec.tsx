import { render, waitFor } from '@testing-library/react'

import { Links } from './Links'

const defaultProps = {
  animationDuration: 1,
  number: 1,
  step: 1,
  fork: false,
}

describe('Links', () => {
  it('renders the correct number of svg paths', () => {
    render(<Links {...defaultProps} number={3} />)
    const paths = document.querySelectorAll('path')
    expect(paths.length).toBe(3)
  })
  it('renders the correct number of svg paths with fork', () => {
    render(<Links {...defaultProps} number={3} fork />)
    const paths = document.querySelectorAll('path')
    expect(paths.length).toBe(4)
  })
  it('renders the correct strokeDashoffset on initial render', () => {
    render(<Links {...defaultProps} />)
    const paths = document.querySelectorAll('path')
    expect(paths[0].getAttribute('stroke-dashoffset')).not.toBe('0')
    waitFor(() => {
      expect(paths[0].getAttribute('stroke-dashoffset')).toBe('0')
    })
  })
  it('renders the correct strokeDashoffset on fork', () => {
    render(<Links {...defaultProps} fork={true} />)
    const paths = document.querySelectorAll('[aria-label="fork-1"]')
    expect(paths[0].getAttribute('stroke-dashoffset')).not.toBe('0')
    waitFor(() => {
      expect(paths[0].getAttribute('stroke-dashoffset')).toBe('0')
    })
  })
})
