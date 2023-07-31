import Box, { type BoxProps } from '@mui/material/Box'
import { animated, useSpringValue } from '@react-spring/web'
import { useEffect } from 'react'

const STROKE_WIDTH = 0.5

const OFFSET = STROKE_WIDTH / 2
const HEIGHT = 7
const WIDTH = 16
const MAX_WIDTH = WIDTH + OFFSET * 2

export interface LinksProps extends BoxProps {
  animationDuration: number
  number: number
  step: number
  fork?: boolean
}

export function Links({
  animationDuration,
  number,
  step,
  fork = false,
  ...boxProps
}: LinksProps) {
  const strokeDashoffset = useSpringValue(WIDTH + HEIGHT)
  const forkStrokeDashoffset = useSpringValue(WIDTH + HEIGHT)
  const numberArr = Array(number).fill(0)

  const MAX_HEIGHT = number * HEIGHT + OFFSET * 2

  useEffect(() => {
    strokeDashoffset.start(0, { config: { duration: animationDuration } })
  }, [strokeDashoffset, animationDuration])

  useEffect(() => {
    if (!fork) return
    forkStrokeDashoffset.start(0, { config: { duration: animationDuration } })
  }, [forkStrokeDashoffset, fork, animationDuration])

  return (
    <Box {...boxProps}>
      <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
        {numberArr.map((_, index) => (
          <animated.path
            style={{ strokeDashoffset }}
            d={`
          M${OFFSET} ${index * HEIGHT + OFFSET}
          H${WIDTH + OFFSET}
          `}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={WIDTH + HEIGHT}
            strokeLinecap="round"
            key={`link-step-${step}-fork-${index}`}
          />
        ))}
        {fork && (
          <animated.path
            style={{ strokeDashoffset: forkStrokeDashoffset }}
            d={`
          M${OFFSET} ${(numberArr.length - 1) * HEIGHT + OFFSET}
          c${WIDTH / 4} 0 ${(3 * WIDTH) / 8} 0 ${WIDTH / 2} ${HEIGHT / 2}
          s${WIDTH / 4} ${HEIGHT / 2} ${WIDTH / 2} ${HEIGHT / 2}
          `}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={WIDTH + HEIGHT}
            strokeLinecap="round"
          />
        )}
      </svg>
    </Box>
  )
}
