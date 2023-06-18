import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import NextPlanOutlinedIcon from '@mui/icons-material/NextPlanOutlined'
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import { Slider, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { Grid } from '@components/Grid'
import { Node, updateNodes } from '@lib/gameOfLife'

const aliveNodes = [
  [20, 30, 1],
  [70, 30, 1],
  [20, 50, 1],
  [30, 60, 1],
  [40, 60, 1],
  [50, 60, 1],
  [60, 60, 1],
  [70, 50, 1],
]

export function GameOfLifeModule() {
  const [nodes, setNodes] = useState(aliveNodes)
  const [step, setStep] = useState(0)
  let [historyNodes, setHistoryNodes] = useState([nodes])

  const [delay, setDelay] = useState(1000)
  const [isRunning, setIsRunning] = useState(false)

  useInterval(
    () => {
      stepNodes()
    },
    isRunning ? delay : null
  )

  function toggleNode(node: Node) {
    let updatedNodes = nodes
    if (
      nodes
        .map((el) => JSON.stringify(el.slice(0, -1)))
        .includes(JSON.stringify(node.slice(0, -1)))
    ) {
      updatedNodes = nodes.filter(
        (el) =>
          JSON.stringify(el.slice(0, -1)) != JSON.stringify(node.slice(0, -1))
      )
    } else {
      updatedNodes = [...nodes, [...node, 1]]
    }
    setNodes(updatedNodes)
    if (step < historyNodes.length) {
      setHistoryNodes([...historyNodes.slice(0, step), updatedNodes])
    }
  }

  function stepNodes() {
    const updatedNodes = updateNodes(
      nodes.map((el) => el.slice(0, -1)),
      100,
      100
    )
    setStep(step + 1)
    setNodes(updatedNodes.map((el) => [...el, 0]))
  }

  function refreshNodes() {
    setNodes(aliveNodes)
    setStep(0)
    setHistoryNodes([aliveNodes])
  }

  function revertStep(e: Event, v: Number | Number[]) {
    if ((v as number) <= historyNodes.length) {
      setStep(v as number)
    }
  }

  useEffect(() => {
    if (step < historyNodes.length) {
      setNodes(historyNodes[step])
    } else {
      setHistoryNodes([...historyNodes, nodes])
    }
  }, [step])

  return (
    <Stack spacing={2} alignItems="center" width="40vw">
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <Typography>Step: {step}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <NextPlanOutlinedIcon onClick={stepNodes} fontSize="large" />
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
          <ChangeCircleOutlinedIcon onClick={refreshNodes} fontSize="large" />
        </Stack>
      </Stack>
      <Grid nodes={nodes} toggleNode={toggleNode} />
      {historyNodes.length > 1 && (
        <Slider
          min={0}
          max={historyNodes.length - 1}
          step={1}
          value={step}
          onChange={revertStep}
          marks={true}
          valueLabelDisplay="off"
        />
      )}
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
