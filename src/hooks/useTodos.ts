import { useState, useEffect } from 'react';
import type { Todo, Filter } from '../types/todo';

const STORAGE_KEY = 'todos';

function loadTodos(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    ]);
  }

  function toggleTodo(id: string): void {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id: string): void {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  function clearCompleted(): void {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return {
    todos: filteredTodos,
    filter,
    activeCount,
    completedCount,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
}
