import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Grow
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
import IconButton from '@/components/IconButton'

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
  onIconButton,
}) => {
  const [checkedAll, setCheckedAll] = useState<boolean>(false)

  useEffect(() => {
    setCheckedAll(false)
  }, [selectorState && selectorState.open])

  const getTitle = () => {
    let text = title ? title : ''
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

  const isSelectorOpen = selectorState ? selectorState.open === true : false;
  const selectorCheckedLength = selectorState ? selectorState.checked.length : 0;

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isSelectorOpen ? (
          <Grow in={isSelectorOpen}>
            <IconButton
              onClick={() =>
                setSelectorState && setSelectorState({ open: false, checked: [] })
              }
            >
              <Close />
            </IconButton>
          </Grow>
        ) : (
          <IconButton
            onClick={onMenu}
          >
            <Menu />
          </IconButton>
        )}

        <Grow in={isSelectorOpen}>
          <Typography style={{ flexGrow: 1 }}>{getTitle()}</Typography>
        </Grow>

        {isSelectorOpen ? (
          <>
            {selectorCheckedLength === 1 && (
              <Grow in={selectorCheckedLength === 1}>
                <IconButton onClick={handleEdit}>
                  <Edit />
                </IconButton>
              </Grow>
            )}
            {selectorCheckedLength > 0 && (
              <Grow in={selectorCheckedLength > 0}>
                <IconButton onClick={handleDelete}>
                  <Delete />
                </IconButton>
              </Grow>
            )}
            <Grow in={true}>
              <IconButton
                onClick={handleToggleCheck}
              >
                {checkedAll ? <ClearAll /> : <SelectAll />}
              </IconButton>
            </Grow>
          </>
        ) : (
          <>
            {onAdd && (
              <IconButton onClick={onAdd}>
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
