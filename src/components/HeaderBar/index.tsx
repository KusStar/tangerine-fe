import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useScrollTrigger,
  Slide
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Close as CloseIcon
} from '@material-ui/icons'

const appName = 'Tangerine'

interface WindowProps {
  window?: () => Window
  children: React.ReactElement
}

const HideOnScroll: React.FC<WindowProps> = props => {
  const { children, window } = props
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

interface IProps {
  title?: string
  onMenu?: () => void
  onAdd?: () => void
  addTaskOpen?: boolean
}

const HeaderBar: React.FC<IProps> = ({ title, onMenu, onAdd, addTaskOpen }) => (
  <HideOnScroll>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenu}
        >
          <MenuIcon />
        </IconButton>

        <Typography style={{ flexGrow: 1 }}>
          {title ? title : appName}
        </Typography>

        {onAdd && (
          <IconButton edge="start" color="inherit" onClick={onAdd}>
            {addTaskOpen === true ? <CloseIcon /> : <AddIcon />}
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  </HideOnScroll>
)

export default HeaderBar
