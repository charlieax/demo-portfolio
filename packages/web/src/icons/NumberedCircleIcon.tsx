import { SvgIcon, SvgIconProps } from '@mui/material'

interface NumberedCircleIconProps extends SvgIconProps {
  number: number
}

export function NumberedCircleIcon({
  number,
  ...props
}: NumberedCircleIconProps) {
  return (
    <SvgIcon {...props} data-testid="NumberedCircleIcon">
      <circle cx="12" cy="12" r="10" />
      <text
        fontSize="14"
        fill="white"
        fontFamily="Verdana"
        textAnchor="middle"
        alignmentBaseline="baseline"
        x="12"
        y="16.4"
      >
        {number}
      </text>
    </SvgIcon>
  )
}
