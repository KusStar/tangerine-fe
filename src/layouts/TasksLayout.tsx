import React from 'react';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TaskItem from '@/components/TaskItem';
import { Task } from '@/interfaces';


interface IProps {
  tasks: Task[];
  onCheck: (task: Task) => void;
}

const TasksLayout: React.FC<IProps> = ({ 
  tasks,
  onCheck
}) => {
  const unfinishedTasks = tasks.filter(task => task.finished === false);
  const finishedTasks = tasks.filter(task => task.finished === true);
  return (
    <>
    {finishedTasks.length > 0 &&
      <ExpansionPanel style={{
        background: 0
      }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{finishedTasks.length} Finished</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ 
          flexDirection: 'column',
          padding:0,
        }}>
          {finishedTasks.map((task, i) => (
              <TaskItem 
                key={i}
                title={task.title}
                subtitle={task.date}
                finished={true}
                onCheck={() => onCheck(task)}
              />
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    }
    {unfinishedTasks.map((task, i) => {
      return (
        <TaskItem 
          key={i}
          title={task.title}
          subtitle={task.date}
          finished={false}
          onCheck={() => onCheck(task)}
        />
      )
    })}
    </>
  )
}

export default TasksLayout;