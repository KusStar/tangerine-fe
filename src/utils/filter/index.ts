import { Task, EditState } from '@/interfaces'

const sourceEqualTarget = (source: Task, target: Task) =>
  source.title === target.title && source.description === target.description

const tasks = (tasks: Task[], newTask: Task, editState?: EditState) => {
  let filteredTasks = tasks.filter(it => !sourceEqualTarget(it, newTask))

  if (editState && editState.editedTask) {
    const { editedTask } = editState
    filteredTasks = tasks.filter(it => !sourceEqualTarget(it, editedTask))
  }
  return filteredTasks
}

export default {
  tasks,
  sourceEqualTarget
}
