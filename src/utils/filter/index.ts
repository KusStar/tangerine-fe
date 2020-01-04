import { Task, EditState } from '@/interfaces'

const filterTasksCondition = (source: Task, target: Task) =>
  !(source.title === target.title && source.description === target.description)

const tasks = (tasks: Task[], newTask: Task, editState?: EditState) => {
  let filteredTasks = tasks.filter(it => filterTasksCondition(it, newTask))

  if (editState && editState.editedTask) {
    const { editedTask } = editState
    filteredTasks = tasks.filter(it => filterTasksCondition(it, editedTask))
  }
  return filteredTasks
}

export default {
  tasks
}
