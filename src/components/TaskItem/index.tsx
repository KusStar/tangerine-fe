import React, { MouseEvent } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  FormControlLabel,
  ExpansionPanelDetails,
  Typography,
  Checkbox,
  Tooltip
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import dateFormatter from '@/utils/formatter/date';

const {
  auto,
  normal
} = dateFormatter;
interface IProps {
  title: string;
  subtitle?: string;
  date: string;
  finished: boolean;
  onCheck?: () => void;
}
const TaskItem: React.FC<IProps> = ({ 
  title,
  subtitle,
  date,
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
      <ExpansionPanelDetails style={{flexDirection:'column'}}>
        {subtitle && 
          <Typography>
            {subtitle}
          </Typography>
        }
        <Tooltip title={normal(date)}>
          <Typography color="textSecondary">
            {auto(date)}
          </Typography>
        </Tooltip>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
export default TaskItem;