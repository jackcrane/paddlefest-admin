import React, { useState } from 'react'
import { PigeonProps } from '../types'

interface MarkerProps extends PigeonProps {
  color?: string
  payload?: any

  width?: number
  height?: number

  // optional modifiers
  hover?: boolean
  style?: React.CSSProperties
  className?: string

  // callbacks
  onClick?: ({ event: HTMLMouseEvent, anchor: Point, payload: any }) => void
  onContextMenu?: ({ event: HTMLMouseEvent, anchor: Point, payload: any }) => void
  onMouseOver?: ({ event: HTMLMouseEvent, anchor: Point, payload: any }) => void
  onMouseOut?: ({ event: HTMLMouseEvent, anchor: Point, payload: any }) => void
}

export function Marker(props: MarkerProps): JSX.Element {
  const width =
    typeof props.width !== 'undefined'
      ? props.width
      : typeof props.height !== 'undefined'
      ? (props.height * 29) / 34
      : 29
  const height =
    typeof props.height !== 'undefined'
      ? props.height
      : typeof props.width !== 'undefined'
      ? (props.width * 34) / 29
      : 34
  const [internalHover, setInternalHover] = useState(props.hover || false)
  const hover = typeof props.hover === 'undefined' ? internalHover : props.hover
  const color = props.color || '#93C0D0'

  // what do you expect to get back with the event
  const eventParameters = (event: React.MouseEvent<SVGElement>) => ({
    event,
    anchor: props.anchor,
    payload: props.payload,
  })

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${props.left - width / 2}px, ${props.top - (height - 1)}px)`,
        filter: hover ? 'drop-shadow(0 0 4px rgba(0, 0, 0, .3))' : '',
        // pointerEvents: 'none',
        cursor: 'pointer',
        ...(props.style || {}),
      }}
      onClick={props.onClick}
      className={props.className ? `${props.className} pigeon-click-block` : 'pigeon-click-block'}
    >
      <svg width={width} height={height} viewBox="0 0 10 10">
        <circle cx={5} cy={5} r={5} fill='red' />
        {/* <rect width={10} height={10} rx={2} fill='red' /> */}
      </svg>

    </div>
  )
}
