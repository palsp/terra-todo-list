export interface TaskParams {
  content: string;
  is_completed: boolean;
  task_id: string;
}

export class Task {
  public id: string;
  public content: string;
  public isCompleted: boolean;
  constructor({ content, is_completed, task_id }: TaskParams) {
    this.id = task_id;
    this.content = content;
    this.isCompleted = is_completed;
  }
}
