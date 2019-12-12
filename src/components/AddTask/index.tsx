import React from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core'

interface IProps {
  open: boolean
  onClose: () => void
}
const AddTask: React.FC<IProps> = ({ open, onClose }) => {
  return (
    <Card>
      <CardContent>
        <form>
          <TextField
            autoFocus
            margin="dense"
            label="Todo"
            fullWidth
            color="secondary"
            multiline

          />
          <TextField
            autoFocus
            margin="dense"
            label="Detail"
            fullWidth
            color="secondary"
            multiline
          />
        </form>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary">
          Save
        </Button>
      </CardActions>
    </Card>
  )
}

export default AddTask
