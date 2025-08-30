import { useState, useEffect } from 'react';
import { Task, TaskInput } from '@/types/task';

const TASKS_KEY = 'productivity-app-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(TASKS_KEY);
    if (saved) {
      try {
        const parsedTasks = JSON.parse(saved).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Failed to load tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskInput: TaskInput) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskInput.title,
      completed: taskInput.completed,
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return {
    tasks,
    activeTasks,
    completedTasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}