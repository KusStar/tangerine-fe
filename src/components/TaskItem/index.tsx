import React, { MouseEvent, FocusEvent } from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  FormControlLabel,
  ExpansionPanelDetails,
  Typography,
  Checkbox,
  Tooltip
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import dateFormatter from '@/utils/formatter/date'
import useLongPress from '@/components/useLongPress'

const { auto, normal } = dateFormatter
interface IProps {
  title: string
  date: string
  subtitle?: string
  finished: boolean
  expanded?: boolean
  onCheck?: () => void
  onLongPress?: () => void
}
const TaskItem: React.FC<IProps> = ({
  title,
  subtitle,
  date,
  finished,
  expanded,
  onCheck,
  onLongPress
}) => {
  const textStyle =
    finished === true
      ? {
          textDecoration: 'line-through'
        }
      : {}

  const defaultEvent = (event: MouseEvent | FocusEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const longPressEvent = onLongPress
    ? useLongPress(onLongPress, { isPreventDefault: false })
    : Object.create(null)

  return (
    <ExpansionPanel
      {...longPressEvent}
      expanded={expanded}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label='Expand'
        onClick={e => e.preventDefault()}
      >
        <FormControlLabel
          control={
            <Checkbox color='secondary' checked={finished} onChange={onCheck} />
          }
          onClick={defaultEvent}
          onFocus={defaultEvent}
          label={title}
          style={textStyle}
        />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
        {subtitle && <Typography>{subtitle}</Typography>}
        <Tooltip title={normal(date)}>
          <Typography color='textSecondary'>{auto(date)}</Typography>
        </Tooltip>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
export default TaskItem
