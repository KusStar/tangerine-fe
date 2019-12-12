import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { Inbox, Mail } from '@material-ui/icons'

interface IProps {
  open: boolean
  onClose: () => void
}

const CustomDrawer: React.FC<IProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <List
        style={{
          width: 250
        }}
      >
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default CustomDrawer
