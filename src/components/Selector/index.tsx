import React, { Fragment } from 'react'
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Typography
} from '@material-ui/core'
import { Task } from '@/interfaces'
import TaskItem from '@/components/TaskItem'

interface IProps {
  tasks: Task[]
  checked: number[]
  setChecked: (checked: number[]) => void
}

const Selector: React.FC<IProps> = ({ tasks, checked, setChecked }) => {
  const handleToggle = (index: number) => () => {
    const currentIndex = checked.indexOf(index)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(index)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  return (
    <Paper>
      <List>
        {tasks.map((task, i) => {
          return (
            <ListItem key={i} dense button onClick={handleToggle(i)}>
              <ListItemIcon>
                <Checkbox checked={checked.indexOf(i) !== -1} disableRipple />
              </ListItemIcon>
              <ListItemText
                primary={task.title}
                secondary={task.description.slice(0, 10)}
              />
            </ListItem>
          )
        })}
      </List>
    </Paper>
  )
}

export default Selector
