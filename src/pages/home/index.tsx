import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import HeaderBar from '@/components/HeaderBar'
import Drawer from '@/components/Drawer'
import AddTask from '@/components/AddTask'
import { Container } from '@material-ui/core'
import request from '@/utils/request'
import Filter from '@/utils/filter'
import { Task, EditState } from '@/interfaces'
import TasksLayout from '@/layouts/TasksLayout'
import storage from '@/utils/storage'

import useStyles from './style'

const Home: React.FC<RouteComponentProps> = props => {
  const styles = useStyles()
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [requested, setRequested] = useState<boolean>(false)
  const [editState, setEditState] = useState<EditState>({
    editing: false
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

  const tasksSorter = (a: Task, b: Task) => {
    const left = parseInt(a.date, 10)
    const right = parseInt(b.date, 10)
    return right - left
  }

  const requestTasks = async () => {
    if (requested === false) {
      const res = await request('tasks')
      const { data } = res
      setTasks(tasks.concat(data.tasks))

      setRequested(true)
    }
  }

  const targetTaskIndex = (task: Task) => {
    return tasks.findIndex(
      it => it.title === task.title && it.date === task.date
    )
  }

  const onAdd = (task: Task, editState: EditState) => {
    let oldTasks = Filter.tasks(tasks, task, editState)
    const newTasks = [task, ...oldTasks]
    setTasks(newTasks)
    setAddTaskOpen(false)
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

  const onDelete = (task: Task) => {
    const index = targetTaskIndex(task)
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  const onEdit = (task: Task) => {
    setAddTaskOpen(true)

    setEditState({
      editing: true,
      editedTask: task
    })
  }

  return (
    <div>
      <HeaderBar
        onMenu={() => setDrawerOpen(true)}
        onAdd={() => setAddTaskOpen(!addTaskOpen)}
        addTaskOpen={addTaskOpen}
      />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Container className={styles.container}>
        {addTaskOpen ? (
          <AddTask onAdd={onAdd} editState={editState} />
        ) : (
          <TasksLayout
            tasks={tasks}
            onCheck={onCheck}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
      </Container>
    </div>
  )
}

export default Home
