import React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  FormControlLabel,
  Checkbox,
  Typography
} from '@material-ui/core'
import { SortableHandle } from 'react-sortable-hoc'

import { DragHandle as DragHandleIcon } from '@material-ui/icons'

const DragHandle = SortableHandle(() => <DragHandleIcon disabled />)

interface IProps {
  title: string
  subtitle?: string
  finished: boolean
  onClick: () => void
}
const SelectItem: React.FC<IProps> = ({
  title,
  subtitle,
  finished,
  onClick
}) => {
  return (
    <ExpansionPanel expanded={false} style={{ borderRadius: 0 }}>
      <ExpansionPanelSummary
        onClick={onClick}
        expandIcon={<DragHandle />}
        disableRipple
      >
        <FormControlLabel
          style={{
            pointerEvents: 'none'
          }}
          control={<Checkbox color='secondary' checked={finished} />}
          label={
            <>
              <Typography>{title}</Typography>
              <Typography color='textSecondary'>{subtitle}</Typography>
            </>
          }
        />
      </ExpansionPanelSummary>
    </ExpansionPanel>
  )
}
export default SelectItem
