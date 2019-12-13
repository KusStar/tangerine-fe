import React, { useState } from 'react'
import {
  TextField,
  Card,
  CardContent,
  Container,
  Fab,
  Box
} from '@material-ui/core'
import { Add } from '@material-ui/icons';

import { Task } from "@/interfaces/Task";

import Snackbar from '@/components/Snackbar';

interface IProps {
  open: boolean;
  onClose: () => void;
  handleAdded: (task: Task) => void;
}
interface IState {
  title: string;
  description: string;
}

const INPUT_SOMETHING = 'You must input something';

const AddTask: React.FC<IProps> = ({ open, onClose, handleAdded }) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [values, setValues] = useState<IState>({
    title: '',
    description: '',
  });
  const handleChange = (prop: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onAdd = () => {
    const { 
      title,
      description
    } = values;
    if(!title) {
      snackbarOpen === false && setSnackbarOpen(true);
      return;
    }
    const task: Task = {
      title,
      description,
      date: new Date().getTime().toString(),
      finished: false
    }
    handleAdded(task);
  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }
  return (
    <Container style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Card style={{ width:"100%" }}>
        <CardContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              label="Todo"
              fullWidth
              color="secondary"
              multiline
              onChange={handleChange('title')}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              color="secondary"
              multiline
              onChange={handleChange('description')}
            />
          </form>
        </CardContent>
      </Card>
      <Box mt={2}>
        <Fab color="primary" onClick={onAdd}>
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
