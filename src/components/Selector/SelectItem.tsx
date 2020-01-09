import React, { MouseEvent, useState, FocusEvent } from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  FormControlLabel,
  Checkbox,
  Typography
} from '@material-ui/core'

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
    <ExpansionPanel expanded={false}>
      <ExpansionPanelSummary aria-label='Expand' onClick={onClick}>
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
