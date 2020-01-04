import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

export interface IProps {
  message?: string
  onClose?: () => void
  open: boolean
  handleClose?: () => void
}

const CustromSnackbar: React.FC<IProps> = props => {
  const { message, onClose, open, handleClose, ...other } = props

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
    />
  )
}

export default CustromSnackbar
