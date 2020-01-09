import React, { ReactNode, MouseEventHandler, CSSProperties } from 'react'
import IconButton from '@material-ui/core/IconButton'

export interface IProps {
  onClick?: MouseEventHandler
  children: ReactNode
  style?: CSSProperties
}

const CustomIconButton: React.FC<IProps> = props => {
  const { onClick, children, style } = props

  return (
    <IconButton edge='start' color='inherit' onClick={onClick} style={style}>
      {children}
    </IconButton>
  )
}

export default CustomIconButton
