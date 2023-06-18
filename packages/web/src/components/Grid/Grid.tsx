import { Box } from '@mui/material'
import { animated, useTrail, useTransition } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'

import { Node, Nodes } from '@lib/gameOfLife'

const STROKE_WIDTH = 0.5

const OFFSET = STROKE_WIDTH / 2

const MAX_WIDTH = 100 + OFFSET * 2
const MAX_HEIGHT = 100 + OFFSET * 2

interface GridProps {
  nodes: Nodes
  toggleNode: (node: Node) => void
}

export function Grid({ nodes, toggleNode }: GridProps) {
  const boxRef = useRef<HTMLInputElement>()
  const [initialRender, setInitialRender] = useState(true)

  const gridSprings = useTrail(11, {
    from: {
      x2: 0,
      y2: 0,
    },
    to: {
      x2: MAX_WIDTH,
      y2: MAX_HEIGHT,
    },
  })

  const transition = useTransition(nodes, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: initialRender ? 1500 : 0,
    config: {
      mass: 2,
      tension: 220,
    },
    trail: 20,
  })

  function clickNode(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const clickedPositionX = e.clientX - boxRef.current?.offsetLeft!
    const clickedPositionY = e.clientY - boxRef.current?.offsetTop!
    const clickedNodeRawX =
      (clickedPositionX * MAX_WIDTH) / boxRef.current?.clientWidth!
    const clickedNodeRawY =
      (clickedPositionY * MAX_HEIGHT) / boxRef.current?.clientHeight!
    const clickedNode = [
      10 * Math.floor(clickedNodeRawX / 10),
      10 * Math.floor(clickedNodeRawY / 10),
    ]

    toggleNode(clickedNode)
  }

  useEffect(() => {
    setInitialRender(false)
  }, [])

  return (
    <Box width="40vw" onClick={clickNode} ref={boxRef}>
      <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
        <g>
          {gridSprings.map(({ x2 }, index) => (
            <animated.line
              x1={0}
              y1={index * 10 + OFFSET}
              x2={x2}
              y2={index * 10 + OFFSET}
              key={index}
              strokeWidth={STROKE_WIDTH}
              stroke="currentColor"
            />
          ))}
          {gridSprings.map(({ y2 }, index) => (
            <animated.line
              x1={index * 10 + OFFSET}
              y1={0}
              x2={index * 10 + OFFSET}
              y2={y2}
              key={index}
              strokeWidth={STROKE_WIDTH}
              stroke="currentColor"
            />
          ))}
        </g>
        {transition((style, node, _, index) => (
          <animated.rect
            key={`node-${index}`}
            width={10}
            height={10}
            fill={node[2] === 0 ? 'currentColor' : 'darkBlue'}
            style={{
              ...style,
              transformOrigin: `${5 + OFFSET * 2}px ${5 + OFFSET * 2}px`,
              transform: `translate(${node[0] + OFFSET}px, ${
                node[1] + OFFSET
              }px)`,
            }}
          />
        ))}
      </svg>
    </Box>
  )
}
