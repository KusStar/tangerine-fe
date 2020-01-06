export interface Task {
  title: string
  description: string
  date: string
  finished: boolean
}
export interface EditState {
  editing: boolean
  editedTask?: Task
}

export interface SnackbarState {
  open: boolean
  title: 'Added' | 'Deleted' | 'Updated' | ''
  targetTask?: Task
  pastTasks?: Task[]
}

export interface SelectorState {
  open: boolean
  checked: number[]
}

export type IconNameType = 'Delete' | 'Edit' | 'SelectAll' | 'ClearAll'
