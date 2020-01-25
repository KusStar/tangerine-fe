import React, { ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { AccountBox, DeleteOutline } from '@material-ui/icons'

interface CustomDrawerProps {
  open: boolean
  onClose: () => void
  routerProps: RouteComponentProps
}
interface DrawerItem {
  Icon: ReactElement
  name: string
}

const items: DrawerItem[] = [
  {
    Icon: <AccountBox />,
    name: 'Account'
  },
  {
    Icon: <DeleteOutline />,
    name: 'Dustbin'
  }
]

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  open,
  onClose,
  routerProps
}) => {
  const onItem = (name: string) => {
    const { history } = routerProps
    switch (name) {
      case 'Dustbin':
        history.push('/dustbin')
        break
    }
  }
  return (
    <Drawer open={open} onClose={onClose}>
      <List
        style={{
          width: 250
        }}
      >
        {items.map((item, index) => (
          <ListItem
            button
            key={item.name + index}
            onClick={() => onItem(item.name)}
          >
            <ListItemIcon>{item.Icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default CustomDrawer
