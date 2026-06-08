import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';
import './App.css';

function App(): React.JSX.Element {
  const {
    todos,
    filter,
    activeCount,
    completedCount,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  } = useTodos();

  return (
    <main className="app">
      <div className="card">
        <h1 className="app__title">투두리스트</h1>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        <TodoFilter
          current={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      </div>
    </main>
  );
}

export default App;
