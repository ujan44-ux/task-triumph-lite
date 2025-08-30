import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';
import { CheckCircle2, Circle } from 'lucide-react';

interface TaskListProps {
  activeTasks: Task[];
  completedTasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ activeTasks, completedTasks, onToggleTask, onDeleteTask }: TaskListProps) {
  if (activeTasks.length === 0 && completedTasks.length === 0) {
    return (
      <div className="text-center py-16">
        <Circle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">No tasks yet</h3>
        <p className="text-muted-foreground">Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Circle className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Active Tasks ({activeTasks.length})
            </h2>
          </div>
          <div className="space-y-3">
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </section>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <h2 className="text-lg font-semibold text-foreground">
              Completed ({completedTasks.length})
            </h2>
          </div>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}