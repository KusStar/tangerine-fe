import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import HeaderBar from '@/components/HeaderBar'
import Drawer from '@/components/Drawer'
import AddTask from '@/components/AddTask'
import { Container, Collapse } from '@material-ui/core'
import request from '@/utils/request';
import { Task } from '@/interfaces';
import TasksLayout from '@/layouts/TasksLayout';
import useStyles from './style';

const Home: React.FC<RouteComponentProps> = props => {
  const styles = useStyles();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    request.get('/tasks')
    .then(res => {
      const {
        data
      } = res;
      setTasks(data.tasks);
    })
  }, [])

  const onCheck = (task:Task) => {
    const index = tasks.findIndex(it => it.title === task.title);
    const newTask = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    newTask.date = new Date().getTime().toString();
    newTask.finished = !newTask.finished;
    newTasks.splice(0, 0, newTask);

    setTasks(newTasks);
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
          <Collapse in={!addTaskOpen}>
            <TasksLayout 
              tasks={tasks}
              onCheck={onCheck}
            />
          </Collapse>
          {addTaskOpen && 
            <AddTask 
              open={addTaskOpen}
              onClose={() => setAddTaskOpen(false)}
            />
          }
        </Container>
    </div>
  )
}

export default Home
