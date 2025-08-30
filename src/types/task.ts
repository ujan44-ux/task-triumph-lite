export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'completedAt'>;