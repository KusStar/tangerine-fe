import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Fade
} from '@material-ui/core'
import {
  Menu,
  Add,
  Close,
  ClearAll,
  SelectAll,
  Delete,
  Edit
} from '@material-ui/icons'
import { SelectorState, IconNameType } from '@/interfaces'

const appName = 'Tangerine'

interface IProps {
  title?: string
  onMenu?: () => void
  onAdd?: () => void
  addTaskOpen?: boolean
  selectorState?: SelectorState
  setSelectorState?: (selectorState: SelectorState) => void
  onIconButton?: (iconName: IconNameType) => void
}

const HeaderBar: React.FC<IProps> = ({
  title,
  onMenu,
  onAdd,
  addTaskOpen,
  selectorState,
  setSelectorState,
  onIconButton
}) => {
  const [checkedAll, setCheckedAll] = useState<boolean>(false)

  useEffect(() => {
    setCheckedAll(false)
  }, [selectorState && selectorState.open])

  const getTitle = () => {
    let text = title ? title : appName
    if (selectorState) {
      const { open, checked } = selectorState
      if (open === true && checked) {
        text = `${checked.length} selected`
      }
    }
    return text
  }

  const handleEdit = () => {
    onIconButton && onIconButton('Edit')
  }

  const handleDelete = () => {
    onIconButton && onIconButton('Delete')
  }

  const handleToggleCheck = () => {
    onIconButton && onIconButton(checkedAll === true ? 'ClearAll' : 'SelectAll')
    setCheckedAll(!checkedAll)
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        {selectorState && selectorState.open === true ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={() =>
              setSelectorState && setSelectorState({ open: false, checked: [] })
            }
          >
            <Close />
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenu}
          >
            <Menu />
          </IconButton>
        )}

        <Typography style={{ flexGrow: 1 }}>{getTitle()}</Typography>
        {selectorState && selectorState.open === true ? (
          <>
            {selectorState.checked.length === 1 && (
              <Fade in={selectorState.checked.length === 1}>
                <IconButton edge="start" color="inherit" onClick={handleEdit}>
                  <Edit />
                </IconButton>
              </Fade>
            )}
            {selectorState.checked.length > 0 && (
              <Fade in={selectorState.checked.length > 0}>
                <IconButton edge="start" color="inherit" onClick={handleDelete}>
                  <Delete />
                </IconButton>
              </Fade>
            )}
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleToggleCheck}
            >
              {checkedAll ? <ClearAll /> : <SelectAll />}
            </IconButton>
          </>
        ) : (
          <>
            {onAdd && (
              <IconButton edge="start" color="inherit" onClick={onAdd}>
                {addTaskOpen === true ? <Close /> : <Add />}
              </IconButton>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default HeaderBar
