import React from 'react'
import { Task, SnackbarState } from '@/interfaces'
import {
  SortableContainer,
  SortableElement,
  SortEnd,
  SortableContainerProps,
  SortableElementProps
} from 'react-sortable-hoc'

import SelectItem from './SelectItem'

interface ISelectorProps {
  tasks: Task[]
  checked: number[]
  setChecked: (checked: number[]) => void
  setTasks: (tasks: Task[]) => void
  setSnackbarState: (snackbarState: SnackbarState) => void
}

interface ISortableContainerProps extends SortableContainerProps {
  tasks: Task[]
}

interface ISortableElementProps extends SortableElementProps {
  task: Task
  finished: boolean
  onClick: () => void
}

const Selector: React.FC<ISelectorProps> = ({
  tasks,
  checked,
  setChecked,
  setTasks,
  setSnackbarState
}) => {
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

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex === newIndex) return
    setChecked([])
    const oldTask = tasks[oldIndex]

    let newTasks = [...tasks]
    newTasks.splice(oldIndex, 1)
    newTasks.splice(newIndex, 0, oldTask)
    setTasks(newTasks)

    setSnackbarState({
      open: true,
      title: 'Sorted',
      pastTasks: tasks
    })
  }

  const SortableItem = SortableElement(
    ({ task, finished, onClick }: ISortableElementProps) => (
      <li style={{ listStyle: 'none' }}>
        <SelectItem
          title={task.title}
          subtitle={task.description}
          finished={finished}
          onClick={onClick}
        />
      </li>
    )
  )

  const SortableList = SortableContainer(
    ({ tasks }: ISortableContainerProps) => {
      return (
        <ul style={{ padding: 0, margin: 0 }}>
          {tasks.map((task: Task, index: number) => (
            <SortableItem
              key={`item-${index}`}
              index={index}
              task={task}
              finished={checked.indexOf(index) !== -1}
              onClick={handleToggle(index)}
            />
          ))}
        </ul>
      )
    }
  )
  return <SortableList tasks={tasks} onSortEnd={onSortEnd} useDragHandle />
}

export default Selector
