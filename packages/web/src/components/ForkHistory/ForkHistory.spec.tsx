import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { ForkHistory } from './ForkHistory'

const defaultProps = {
  nodesHistory: [
    [
      [
        {
          node: [1, 1],
          initialisedOnStep: true,
        },
      ],
    ],
  ],
  step: 1,
  fork: 1,
  onSetNodes: vi.fn(),
}

describe('Links', () => {
  it('renders initial button with no links', () => {
    render(<ForkHistory {...defaultProps} />)
    expect(screen.getByLabelText('node-step-0-fork-0')).toBeInTheDocument()
    const links = screen.queryAllByLabelText(/link-step-\d-fork-\d/)
    expect(links.length).toBe(0)
  })
  it('calls onSetNodes with step and fork when node is clicked', () => {
    render(<ForkHistory {...defaultProps} />)
    const button = screen.getByLabelText('node-step-0-fork-0')
    button.click()
    expect(defaultProps.onSetNodes).toHaveBeenCalledWith(0, 0)
  })
  it('renders links if there is one more step', () => {
    render(
      <ForkHistory
        {...defaultProps}
        nodesHistory={[
          [
            [
              {
                node: [1, 1],
                initialisedOnStep: true,
              },
            ],
          ],
          [
            [
              {
                node: [1, 1],
                initialisedOnStep: true,
              },
            ],
          ],
        ]}
      />,
    )
    const buttons = screen.queryAllByLabelText(/node-step-\d-fork-\d/)
    const links = screen.queryAllByLabelText(/link-step-\d-fork-\d/)
    expect(links[0]).toBeInTheDocument()
    expect(buttons.length).toBe(2)
  })
  it('renders multiple nodes if there is more than one fork', () => {
    render(
      <ForkHistory
        {...defaultProps}
        nodesHistory={[
          [
            [
              {
                node: [1, 1],
                initialisedOnStep: true,
              },
            ],
            [
              {
                node: [1, 1],
                initialisedOnStep: true,
              },
            ],
          ],
        ]}
      />,
    )
    const buttons = screen.getAllByLabelText(/node-step-\d-fork-\d/)
    expect(buttons.length).toBe(2)
  })
})
