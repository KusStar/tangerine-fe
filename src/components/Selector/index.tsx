import React, { Fragment } from 'react'
import { Task } from '@/interfaces'
import SelectItem from './SelectItem'

interface IProps {
  tasks: Task[]
  checked: number[]
  setChecked: (checked: number[]) => void
}

const Selector: React.FC<IProps> = ({ tasks, checked, setChecked }) => {
  const handleToggle = (index: number) => () => {
    const currentIndex = checked.indexOf(index)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(index)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  return (
    <>
      {tasks.map((task, i) => {
        return (
          <SelectItem
            key={i}
            title={task.title}
            subtitle={task.description}
            finished={checked.indexOf(i) !== -1}
            onClick={handleToggle(i)}
          />
        )
      })}
    </>
  )
}

export default Selector
