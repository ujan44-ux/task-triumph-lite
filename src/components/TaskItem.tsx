import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Small delay for animation
    setTimeout(() => {
      onDelete(task.id);
    }, 150);
  };

  return (
    <div
      className={cn(
        "group bg-gradient-card border border-border/50 rounded-lg p-4 transition-all duration-300 ease-smooth hover:shadow-medium hover:border-border animate-slide-in",
        isDeleting && "opacity-0 scale-95",
        task.completed && "opacity-70"
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 ease-bounce flex items-center justify-center",
            task.completed
              ? "bg-success border-success text-success-foreground"
              : "border-border hover:border-primary"
          )}
        >
          {task.completed && (
            <Check className="w-4 h-4 animate-check-bounce" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-lg font-medium transition-all duration-300",
              task.completed
                ? "line-through text-muted-foreground"
                : "text-foreground"
            )}
          >
            {task.title}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {task.completed && task.completedAt
              ? `Completed ${task.completedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : `Created ${task.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            }
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}