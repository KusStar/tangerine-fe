import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container, Snackbar, Button } from '@material-ui/core'
import { Menu, Add, Close } from '@material-ui/icons'
import HeaderBar from '@/components/HeaderBar'
import Drawer from '@/components/Drawer'
import AddTask from '@/components/AddTask'
import request from '@/utils/request'
import Filter from '@/utils/filter'
import {
  Task,
  EditState,
  SnackbarState,
  SelectorState,
  IconNameType
} from '@/interfaces'
import TasksLayout from '@/layouts/TasksLayout'
import Selector from '@/components/Selector'
import SelectorHeader from '@/components/Selector/Header'
import storage from '@/utils/storage'

import useStyles from '@/theme/container.style'

const Home: React.FC<RouteComponentProps> = props => {
  const styles = useStyles()
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [requested, setRequested] = useState<boolean>(false)
  const [editState, setEditState] = useState<EditState>({
    editing: false
  })
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    title: ''
  })
  const [selectorState, setSelectorState] = useState<SelectorState>({
    open: false,
    checked: []
  })

  useEffect(() => {
    setTasks(storage.tasks)
  }, [])

  useEffect(() => {
    storage.tasks = tasks
  }, [tasks])

  useEffect(() => {
    if (addTaskOpen === false) {
      setEditState({
        editing: false,
        editedTask: undefined
      })
    }
  }, [addTaskOpen])

  // const tasksSorter = (a: Task, b: Task) => {
  //   const left = parseInt(a.date, 10)
  //   const right = parseInt(b.date, 10)
  //   return right - left
  // }

  // const requestTasks = async () => {
  //   if (requested === false) {
  //     const res = await request('tasks')
  //     const { data } = res
  //     setTasks(tasks.concat(data.tasks))

  //     setRequested(true)
  //   }
  // }

  const targetTaskIndex = (task: Task) => {
    return tasks.findIndex(
      it => it.title === task.title && it.date === task.date
    )
  }

  const onAdd = (task: Task, editState: EditState) => {
    let oldTasks = Filter.tasks(tasks, task, editState)
    const newTasks = [task, ...oldTasks]
    setAddTaskOpen(false)

    setSnackbarState({
      open: true,
      title: snackbarState.title || 'Added',
      targetTask: task,
      pastTasks: tasks
    })
    setTasks(newTasks)
  }

  const onCheck = (task: Task) => {
    const index = targetTaskIndex(task)
    const newTasks = tasks.filter((_, i) => i !== index)
    const newTask = tasks[index]
    newTask.date = new Date().getTime().toString()
    newTask.finished = !newTask.finished
    newTasks.splice(0, 0, newTask)

    setTasks(newTasks)
  }

  const onDelete = (targetIndexArray: number[]) => {
    const newTasks = tasks.filter((_, i) => targetIndexArray.indexOf(i) === -1)

    setSnackbarState({
      open: true,
      title: 'Deleted',
      pastTasks: tasks
    })
    setTasks(newTasks)
  }

  const onEdit = (task: Task) => {
    setAddTaskOpen(true)

    setEditState({
      editing: true,
      editedTask: task
    })

    setSnackbarState({
      ...snackbarState,
      title: 'Updated'
    })
  }

  const generateNewChecked = () => {
    const fullChecked = Array.from(new Array(tasks.length).keys())
    const unfinishedChecked = fullChecked.filter(
      index => !tasks[index].finished
    )
    return unfinishedChecked
  }

  const onIconButton = (iconName: IconNameType) => {
    let newChecked: number[] = []
    let newOpen = selectorState.open
    switch (iconName) {
      case 'SelectAll':
        newChecked = generateNewChecked()
        break
      case 'ClearAll':
        // pass
        break
      case 'Edit':
        const targetTaskIndex = selectorState.checked[0]
        onEdit(tasks[targetTaskIndex])
        newOpen = false
        break
      case 'Delete':
        onDelete(selectorState.checked)
        newOpen = false
    }
    setSelectorState({
      open: newOpen,
      checked: newChecked
    })
  }

  const handleSnackbarClose = (undo: boolean) => {
    if (!snackbarState.open) return
    if (undo === true && snackbarState.pastTasks) {
      setTasks(snackbarState.pastTasks)
    } else {
      // TODO: request remote API
      // Add task or delete task
      finalTasksChange(snackbarState)
    }
    setSnackbarState({
      open: false,
      title: ''
    })
  }

  const finalTasksChange = (state: SnackbarState) => {
    const { title, pastTasks } = state
    if (pastTasks && pastTasks.length > 0) {
      switch (title) {
        case 'Deleted':
          const deleted = Filter.diff(pastTasks, tasks)
          const result = Filter.union(storage.dustbin, deleted)
          storage.dustbin = result
          break
      }
    }
  }

  const onDrawerClose = () => {
    setDrawerOpen(false)
  }

  return (
    <>
      {selectorState.open ? (
        <SelectorHeader
          selectorState={selectorState}
          setSelectorState={setSelectorState}
          onIconButton={iconName => onIconButton(iconName)}
          unfinishedLength={tasks.filter(it => !it.finished).length}
        />
      ) : (
        <HeaderBar
          leftButton={{
            Icon: <Menu />,
            onClick: () => setDrawerOpen(true)
          }}
          rightButtons={[
            {
              Icon: addTaskOpen === true ? <Close /> : <Add />,
              onClick: () => setAddTaskOpen(!addTaskOpen)
            }
          ]}
        />
      )}

      <Drawer open={drawerOpen} onClose={onDrawerClose} routerProps={props} />

      <Container className={styles.container}>
        {selectorState.open === true ? (
          <Selector
            tasks={tasks}
            checked={selectorState.checked}
            setTasks={setTasks}
            setChecked={(checked: number[]) =>
              setSelectorState({
                ...selectorState,
                checked: checked
              })
            }
            setSnackbarState={setSnackbarState}
          />
        ) : (
          <>
            {addTaskOpen ? (
              <AddTask onAdd={onAdd} editState={editState} />
            ) : (
              <TasksLayout
                tasks={tasks}
                onCheck={onCheck}
                setChecked={(checked: number[]) =>
                  setSelectorState({
                    open: true,
                    checked: checked
                  })
                }
              />
            )}
          </>
        )}
      </Container>
      <Snackbar
        open={snackbarState.open}
        onClose={() => handleSnackbarClose(false)}
        message={<span>{snackbarState.title}</span>}
        action={[
          <Button
            key='undo'
            color='secondary'
            size='small'
            onClick={() => handleSnackbarClose(true)}
          >
            UNDO
          </Button>
        ]}
      />
    </>
  )
}

export default Home
