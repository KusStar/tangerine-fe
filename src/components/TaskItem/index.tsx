import React, { MouseEvent } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  FormControlLabel,
  ExpansionPanelDetails,
  Typography,
  Checkbox,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import dateFormatter from '@/utils/formatter/date';

interface IProps {
  title: string;
  subtitle: string;
  finished: boolean;
  onCheck?: () => void;
}
const TaskItem: React.FC<IProps> = ({ 
  title,
  subtitle,
  finished,
  onCheck
})  => {
  const textStyle = finished === true ? {
    textDecoration: 'line-through',
  } : {};

  const defaultEvent = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }

  const dateText = dateFormatter(subtitle);
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
      >
        <FormControlLabel
          control={<Checkbox color="secondary" checked={finished} onChange={onCheck}/>}
          onClick={defaultEvent}
          label={title}
          style={textStyle}
        />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography color="textSecondary">
          {dateText}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
export default TaskItem;