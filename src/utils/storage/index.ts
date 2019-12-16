import { Task } from "@/interfaces";

const KEYS = {
  tasks: 'tasks'
}

export default {
  get tasks() {
    return JSON.parse(localStorage.getItem(KEYS.tasks) || '[]')
  },
  set tasks(newTasks: Task[]) {
    newTasks && localStorage.setItem(KEYS.tasks, JSON.stringify(newTasks));
  }
}