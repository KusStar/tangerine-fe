import React, { useState, useEffect } from 'react'
import {
  TextField,
  Card,
  CardContent,
  Container,
  Fab,
  Box
} from '@material-ui/core'
import { Add } from '@material-ui/icons'

import { Task, EditState } from '@/interfaces'

import Snackbar from '@/components/Snackbar'

interface IProps {
  onAdd: (task: Task, editState: EditState) => void
  editState: EditState
}
interface IState {
  title: string
  description: string
}

const INPUT_SOMETHING = 'You must input something'

const AddTask: React.FC<IProps> = ({ onAdd, editState }) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [values, setValues] = useState<IState>({
    title: '',
    description: ''
  })

  useEffect(() => {
    const { editedTask } = editState
    if (editedTask) {
      setValues({
        title: editedTask.title,
        description: editedTask.description
      })
    }
  }, [editState.editedTask])

  const handleChange = (prop: keyof IState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleAdd = () => {
    const { title, description } = values
    if (!title) {
      snackbarOpen === false && setSnackbarOpen(true)
      return
    }
    const task: Task = {
      title,
      description,
      date: new Date().getTime().toString(),
      finished: false
    }
    onAdd(task, editState)
  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Card style={{ width: '100%' }}>
        <CardContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              color="secondary"
              multiline
              onChange={handleChange('title')}
              value={values.title}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              color="secondary"
              multiline
              onChange={handleChange('description')}
              value={values.description}
            />
          </form>
        </CardContent>
      </Card>
      <Box mt={2}>
        <Fab color="primary" onClick={handleAdd}>
          <Add />
        </Fab>
      </Box>

      <Snackbar
        open={snackbarOpen}
        message={INPUT_SOMETHING}
        handleClose={handleSnackbarClose}
      />
    </Container>
  )
}

export default AddTask
