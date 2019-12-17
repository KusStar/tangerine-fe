import React, { useState } from 'react';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Fade,
  Popover,
  IconButton
} from '@material-ui/core'
import { ExpandMore, Delete, Edit} from '@material-ui/icons';

import { CurrentTarget } from '@/components/useLongPress';
import TaskItem from '@/components/TaskItem';
import { Task } from "@/interfaces";

interface IProps {
  tasks: Task[];
  onCheck: (task: Task) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}
const TasksLayout: React.FC<IProps> = ({ 
  tasks,
  onCheck,
  onDelete,
  onEdit
}) => {
  const [anchorEl, setAnchorEl] = useState<CurrentTarget>(null);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const unfinishedTasks = tasks.filter(task => task.finished === false);
  const finishedTasks = tasks.filter(task => task.finished === true);

  const open = Boolean(anchorEl);
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleLongPress = (target?: CurrentTarget, task?: Task) => {
    if (target && task) {
      setAnchorEl(target);
      setCurrentTask(task);
    }
  }
  const handleDelete = () => {
    if (currentTask) {
      handlePopoverClose();
      onDelete(currentTask);
    }
  }
  const handleEdit = () => {
    if (currentTask) {
      handlePopoverClose();
      onEdit(currentTask);
    }
  }
  return (
    <>
    {finishedTasks.length > 0 &&
      <Fade in={finishedTasks.length > 0}>
        <ExpansionPanel style={{
          background: 0
        }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore/>}
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
                subtitle={task.description}
                date={task.date}
                finished={true}
                onCheck={() => onCheck(task)}
                onLongPress={(t?: CurrentTarget) => handleLongPress(t, task)}
              />
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Fade>
    }
    {unfinishedTasks.map((task, i) => {
      return (
        <TaskItem 
          key={i}
          title={task.title}
          subtitle={task.description}
          date={task.date}
          finished={false}
          onCheck={() => onCheck(task)}
          onLongPress={(t?: CurrentTarget) => handleLongPress(t, task)}
        />
      )
    })}
    
    <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
      </Popover>
    </>
  )
}


export default TasksLayout;