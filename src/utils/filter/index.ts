import { Task, EditState } from '@/interfaces'

const sourceEqualTarget = (source: Task, target: Task): boolean =>
  source.title === target.title && source.description === target.description

const tasks = (tasks: Task[], newTask: Task, editState?: EditState): Task[] => {
  let filteredTasks = tasks.filter(it => !sourceEqualTarget(it, newTask))

  if (editState && editState.editedTask) {
    const { editedTask } = editState
    filteredTasks = tasks.filter(it => !sourceEqualTarget(it, editedTask))
  }
  return filteredTasks
}

const useLongAndShort = (a: Task[], b: Task[]): [Task[], Task[]] => {
  return a.length > b.length ? [a, b] : [b, a]
}

const diff = (a: Task[], b: Task[]): Task[] => {
  const [long, short] = useLongAndShort(a, b)
  return long.filter(past => !short.some(now => sourceEqualTarget(past, now)))
}

const union = (a: Task[], b: Task[]): Task[] => {
  const [long, short] = useLongAndShort(a, b)
  return short.concat(diff(long, short))
}

export default {
  tasks,
  diff,
  union,
  sourceEqualTarget
}
