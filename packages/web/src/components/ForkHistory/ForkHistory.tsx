import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { Fragment } from 'react'

import { Links } from '@components/Links'
import { NumberedCircleIcon } from '@icons/NumberedCircleIcon'
import { type NodesHistory } from '@lib/gameOfLife'

interface ForkHistoryProps {
  nodesHistory: NodesHistory
  step: number
  fork: number
  onSetNodes: (step: number, fork: number) => void
}

export function ForkHistory({
  nodesHistory,
  step,
  fork,
  onSetNodes,
}: ForkHistoryProps) {
  return (
    <Stack direction={'row'}>
      <Stack>
        {nodesHistory[0].map((_, forkIndex) => (
          <IconButton
            key={`node-step-0-fork-${forkIndex}`}
            onClick={() => {
              onSetNodes(0, forkIndex)
            }}
          >
            <NumberedCircleIcon
              number={forkIndex + 1}
              color={step === 0 && fork === forkIndex ? 'primary' : 'secondary'}
            />
          </IconButton>
        ))}
      </Stack>
      {nodesHistory.slice(1).map((stepNodes, stepIndex) => {
        const forkRequired =
          stepNodes.length === 1
            ? false
            : stepNodes.length != nodesHistory[stepIndex].length
        return (
          <Fragment key={`div-step-${stepIndex + 1}`}>
            <Links
              animationDuration={500}
              number={forkRequired ? stepNodes.length - 1 : stepNodes.length}
              step={stepIndex + 1}
              fork={forkRequired}
              width={100}
              paddingTop={2}
              key={`links-step-${stepIndex + 1}`}
            />
            <Stack>
              {stepNodes.map((_, forkIndex) => (
                <IconButton
                  key={`node-step-${stepIndex + 1}-fork-${forkIndex}`}
                  onClick={() => {
                    onSetNodes(stepIndex + 1, forkIndex)
                  }}
                >
                  <NumberedCircleIcon
                    number={forkIndex + 1}
                    color={
                      step === stepIndex + 1 && fork === forkIndex
                        ? 'primary'
                        : 'secondary'
                    }
                  />
                </IconButton>
              ))}
            </Stack>
          </Fragment>
        )
      })}
    </Stack>
  )
}
