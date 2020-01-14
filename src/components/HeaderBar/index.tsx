import React, { ReactNode } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import IconButton from '@/components/IconButton'

interface BasicButton {
  Icon: ReactNode
  onClick: () => void
}

interface IProps {
  title?: string
  leftButton?: BasicButton
  rightButtons?: BasicButton[]
}

const HeaderBar: React.FC<IProps> = ({ title, leftButton, rightButtons }) => {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        {leftButton && (
          <IconButton onClick={leftButton.onClick}>
            {leftButton.Icon}
          </IconButton>
        )}
        <Typography style={{ flexGrow: 1 }}>{title || ''}</Typography>
        {rightButtons &&
          rightButtons.map((button, i) => (
            <IconButton key={`rightButton-${i}`} onClick={button.onClick}>
              {button.Icon}
            </IconButton>
          ))}
      </Toolbar>
    </AppBar>
  )
}

export default HeaderBar
