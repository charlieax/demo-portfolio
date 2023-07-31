import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import NextPlanOutlinedIcon from '@mui/icons-material/NextPlanOutlined'
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import { Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { ForkHistory } from '@components/ForkHistory'
import { Grid } from '@components/Grid'
import {
  updateNodes,
  type Node,
  type Nodes,
  type NodesHistory,
} from '@lib/gameOfLife'

const initialNodes = [
  {
    node: [2, 3],
    initialisedOnStep: true,
  },
  {
    node: [7, 3],
    initialisedOnStep: true,
  },
  {
    node: [2, 5],
    initialisedOnStep: true,
  },
  {
    node: [3, 6],
    initialisedOnStep: true,
  },
  {
    node: [4, 6],
    initialisedOnStep: true,
  },
  {
    node: [5, 6],
    initialisedOnStep: true,
  },
  {
    node: [6, 6],
    initialisedOnStep: true,
  },
  {
    node: [7, 5],
    initialisedOnStep: true,
  },
]

type GameOfLifeModuleProps = {}

export function GameOfLifeModule() {
  const [nodes, setNodes] = useState(initialNodes)
  const [step, setStep] = useState(0)
  const [fork, setFork] = useState(0)
  const [nodesHistory, setNodesHistory] = useState<NodesHistory>([
    [initialNodes],
  ])

  const [delay, setDelay] = useState(1000)
  const [isRunning, setIsRunning] = useState(false)

  useInterval(
    () => {
      handleStepNodes()
    },
    isRunning ? delay : null,
  )

  function handleToggleNode(node: Node) {
    let updatedNodes: Nodes
    if (
      nodes.map((el) => JSON.stringify(el.node)).includes(JSON.stringify(node))
    ) {
      updatedNodes = nodes.filter(
        (el) => JSON.stringify(el.node) != JSON.stringify(node),
      )
    } else {
      updatedNodes = [...nodes, { node, initialisedOnStep: true }]
    }
    setNodes(updatedNodes)
  }

  function handleStepNodes() {
    const newForkRequired =
      JSON.stringify(nodes) !== JSON.stringify(nodesHistory[step][fork])

    const nodesHistoryCurrentStep = newForkRequired
      ? [...nodesHistory[step].slice(0, fork + 1), nodes]
      : nodesHistory[step]

    const nodesHistoryUpdateStep = nodesHistoryCurrentStep.map((stepNodes) =>
      updateNodes(
        stepNodes.map((el) => el.node),
        10,
        10,
      ).map((el) => ({ node: el, initialisedOnStep: false })),
    )

    setNodesHistory([
      ...nodesHistory.slice(0, step),
      nodesHistoryCurrentStep,
      nodesHistoryUpdateStep,
    ])
    setNodes(nodesHistoryUpdateStep[newForkRequired ? fork + 1 : fork])
    setStep(step + 1)
    if (newForkRequired) {
      setFork(fork + 1)
    }
  }

  function handleRefreshNodes() {
    setNodes(initialNodes)
    setStep(0)
    setFork(0)
    setNodesHistory([[initialNodes]])
  }

  function handleSetNodes(step: number, fork: number) {
    setNodes(nodesHistory[step][fork])
    setStep(step)
    setFork(fork)
  }

  return (
    <Stack spacing={2} alignItems="center" width="40vw">
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <Typography>Step: {step}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <NextPlanOutlinedIcon onClick={handleStepNodes} fontSize="large" />
          {isRunning ? (
            <PauseCircleOutlinedIcon
              onClick={() => setIsRunning(!isRunning)}
              fontSize="large"
            />
          ) : (
            <PlayCircleOutlinedIcon
              onClick={() => setIsRunning(!isRunning)}
              fontSize="large"
            />
          )}
          <ChangeCircleOutlinedIcon
            onClick={handleRefreshNodes}
            fontSize="large"
          />
        </Stack>
      </Stack>

      <Grid nodes={nodes} onToggleNode={handleToggleNode} />
      <Typography variant="h6">History</Typography>
      <ForkHistory
        nodesHistory={nodesHistory}
        step={step}
        fork={fork}
        onSetNodes={handleSetNodes}
      />
    </Stack>
  )
}

function useInterval(callback: Function, delay: number | null) {
  const savedCallback = useRef<Function>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
