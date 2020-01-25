import { Task } from '@/interfaces'

const KEYS = {
  tasks: 'tasks',
  dustbin: 'dustbin'
}
const load = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '[]')
}

const save = (newTasks: Task[], key: string) => {
  newTasks && localStorage.setItem(key, JSON.stringify(newTasks))
}

export default {
  get tasks() {
    return load(KEYS.tasks)
  },
  set tasks(newTasks: Task[]) {
    save(newTasks, KEYS.tasks)
  },

  get dustbin() {
    return load(KEYS.dustbin)
  },
  set dustbin(newTasks: Task[]) {
    save(newTasks, KEYS.dustbin)
  }
}
