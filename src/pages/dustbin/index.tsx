import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { Close, RotateRight, ClearAll, SelectAll } from '@material-ui/icons'
import { Task } from '@/interfaces'
import storage from '@/utils/storage'
import HeaderBar from '@/components/HeaderBar'
import Selector from '@/components/Selector'
import useStyles from '@/theme/container.style'
import Filter from '@/utils/filter'

const Dustbin: React.FC<RouteComponentProps> = props => {
  const styles = useStyles()
  const [dustbin, setDustbin] = useState<Task[]>([])
  const [checked, setChecked] = useState<number[]>([])

  const isCheckAll = checked.length === dustbin.length && dustbin.length > 0

  useEffect(() => {
    setDustbin(storage.dustbin)

    return () => setDustbin([])
  }, [])

  useEffect(() => {
    storage.dustbin = dustbin
  }, [dustbin])

  const onClearAll = () => {
    setChecked([])
  }

  const onSelectAll = () => {
    setChecked(Array.from(new Array(dustbin.length).keys()))
  }

  const onRecover = () => {
    if (checked.length > 0) {
      const uncheckedTasks = dustbin.filter((_, i) => checked.indexOf(i) === -1)
      const checkedTasks = dustbin.filter((_, i) => checked.indexOf(i) !== -1)
      const result = Filter.union(checkedTasks, storage.tasks)

      setDustbin(uncheckedTasks)
      setChecked([])

      storage.tasks = result
    }
  }

  return (
    <>
      <HeaderBar
        title={'Dustbin'}
        leftButton={{
          Icon: <Close />,
          onClick: () => props.history.goBack()
        }}
        rightButtons={[
          {
            Icon: <RotateRight />,
            onClick: onRecover
          },
          isCheckAll
            ? {
                Icon: <ClearAll />,
                onClick: onClearAll
              }
            : {
                Icon: <SelectAll />,
                onClick: onSelectAll
              }
        ]}
      />
      <Container className={styles.container}>
        <Selector
          tasks={dustbin}
          checked={checked}
          setChecked={setChecked}
          draggable={false}
        />
      </Container>
    </>
  )
}

export default Dustbin
