import React, { useState } from 'react'
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Fade
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

import TaskItem from '@/components/TaskItem'
import { Task } from '@/interfaces'
import Filter from '@/utils/filter'

interface IProps {
  tasks: Task[]
  onCheck: (task: Task) => void
  setChecked: (checked: number[]) => void
}
const TasksLayout: React.FC<IProps> = ({ tasks, onCheck, setChecked }) => {
  const unfinishedTasks = tasks.filter(task => task.finished === false)
  const finishedTasks = tasks.filter(task => task.finished === true)
  const handleLongPress = (task?: Task) => {
    if (task) {
      const index = tasks.findIndex(it => Filter.sourceEqualTarget(it, task))
      setChecked([index])
    }
  }
  return (
    <>
      {finishedTasks.length > 0 && (
        <Fade in={finishedTasks.length > 0}>
          <ExpansionPanel
            style={{
              background: 0
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>{finishedTasks.length} Finished</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              style={{
                flexDirection: 'column',
                padding: 0
              }}
            >
              {finishedTasks.map((task, i) => (
                <TaskItem
                  key={i}
                  title={task.title}
                  subtitle={task.description}
                  date={task.date}
                  finished={true}
                  onCheck={() => onCheck(task)}
                  onLongPress={() => handleLongPress(task)}
                />
              ))}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Fade>
      )}
      {unfinishedTasks.map((task, i) => {
        return (
          <TaskItem
            key={i}
            title={task.title}
            subtitle={task.description}
            date={task.date}
            finished={false}
            onCheck={() => onCheck(task)}
            onLongPress={() => handleLongPress(task)}
          />
        )
      })}
    </>
  )
}

export default TasksLayout
