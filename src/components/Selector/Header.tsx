import React from 'react'
import { AppBar, Toolbar, Typography, Grow } from '@material-ui/core'
import { Close, ClearAll, SelectAll, Delete, Edit } from '@material-ui/icons'
import { SelectorState, IconNameType } from '@/interfaces'
import IconButton from '@/components/IconButton'

interface IProps {
  selectorState: SelectorState
  setSelectorState: (selectorState: SelectorState) => void
  onIconButton: (iconName: IconNameType) => void
  unfinishedLength: number
}

const SelectorHeader: React.FC<IProps> = ({
  selectorState,
  setSelectorState,
  onIconButton,
  unfinishedLength
}) => {
  const checkedAll = unfinishedLength === selectorState.checked.length

  const getTitle = () => {
    return `${selectorState.checked.length} selected`
  }

  const handleEdit = () => {
    onIconButton && onIconButton('Edit')
  }

  const handleDelete = () => {
    onIconButton && onIconButton('Delete')
  }

  const handleToggleCheck = () => {
    onIconButton && onIconButton(checkedAll ? 'ClearAll' : 'SelectAll')
  }

  const selectorCheckedLength = selectorState ? selectorState.checked.length : 0

  return (
    <AppBar>
      <Toolbar>
        <Grow in={true}>
          <IconButton
            onClick={() =>
              setSelectorState && setSelectorState({ open: false, checked: [] })
            }
          >
            <Close />
          </IconButton>
        </Grow>
        <Grow in={true}>
          <Typography style={{ flexGrow: 1 }}>{getTitle()}</Typography>
        </Grow>
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
          <IconButton onClick={handleToggleCheck}>
            {checkedAll ? <ClearAll /> : <SelectAll />}
          </IconButton>
        </Grow>
      </Toolbar>
    </AppBar>
  )
}

export default SelectorHeader
