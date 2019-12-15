import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import HeaderBar from '@/components/HeaderBar'
import Drawer from '@/components/Drawer'
import AddTask from '@/components/AddTask'
import { Container } from '@material-ui/core'
import request from '@/utils/request';
import { Task } from "@/interfaces"
import TasksLayout from '@/layouts/TasksLayout';
import storage from '@/utils/storage'

import useStyles from './style';


const Home: React.FC<RouteComponentProps> = props => {
  const styles = useStyles();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(storage.tasks);
  }, []);

  useEffect(() => {
    storage.tasks = tasks;
  }, [tasks])
  // useEffect(() => {
  //   request.get('/tasks')
  //   .then(res => {
  //     const {
  //       data
  //     } = res;
  //   })
  // }, [])

  const onCheck = (task:Task) => {
    const index = tasks.findIndex(it => 
      it.title === task.title && it.date === task.date);
    const newTasks = tasks.filter((_, i) => i !== index);
    const newTask = tasks[index];
    newTask.date = new Date().getTime().toString();
    newTask.finished = !newTask.finished;
    newTasks.splice(0, 0, newTask);

    setTasks(newTasks);
  }

  const handleAdded = (task: Task) => {
    const oldTasks = tasks.filter(it => 
      it.title !== task.title || it.description !== task.description);
    const newTasks = [task, ...oldTasks];

    setTasks(newTasks);
    setAddTaskOpen(false);
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
        {addTaskOpen ? 
          <AddTask 
            open={addTaskOpen}
            onClose={() => setAddTaskOpen(false)}
            handleAdded={handleAdded}
          />
        :
          <TasksLayout 
            tasks={tasks}
            onCheck={onCheck}
          />
        }
      </Container>
    </div>
  )
}

export default Home
