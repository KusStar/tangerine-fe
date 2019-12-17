export interface Task {
  title: string;
  description: string;
  date: string;
  finished: boolean;
}
export interface EditState {
  editing: boolean;
  editedTask?: Task;
}