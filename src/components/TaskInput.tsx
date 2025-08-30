import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <div className="flex-1">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="h-14 text-lg bg-card border-2 border-border/50 focus:border-primary transition-all duration-300 shadow-soft"
        />
      </div>
      <Button 
        type="submit"
        size="lg"
        className="h-14 px-6 bg-gradient-primary text-primary-foreground hover:shadow-medium transition-all duration-300 ease-smooth"
        disabled={!title.trim()}
      >
        <Plus className="w-5 h-5" />
        <span className="ml-2 hidden sm:inline">Add Task</span>
      </Button>
    </form>
  );
}