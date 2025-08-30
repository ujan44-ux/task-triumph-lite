import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { useTasks } from '@/hooks/useTasks';
import { CheckSquare, Calendar } from 'lucide-react';

const Index = () => {
  const { activeTasks, completedTasks, addTask, toggleTask, deleteTask } = useTasks();
  const totalTasks = activeTasks.length + completedTasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  const handleAddTask = (title: string) => {
    addTask({ title, completed: false });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-2xl text-primary-foreground">
              <CheckSquare className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-soft bg-clip-text text-transparent">
              Daily Tasks
            </h1>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Stay organized and productive with your daily task management
          </p>
          
          {/* Stats */}
          {totalTasks > 0 && (
            <div className="inline-flex items-center gap-6 bg-card border border-border/50 rounded-full px-6 py-3 shadow-soft">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {totalTasks} task{totalTasks !== 1 ? 's' : ''} today
                </span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-success">
                  {completionRate}% complete
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Task Input */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Task List */}
        <TaskList
          activeTasks={activeTasks}
          completedTasks={completedTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Index;
