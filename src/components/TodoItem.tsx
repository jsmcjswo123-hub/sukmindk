import type { Todo } from '../types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props): React.JSX.Element {
  return (
    <li className={`todo-item${todo.completed ? ' todo-item--completed' : ''}`}>
      <button
        className="todo-item__check"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? '미완료로 변경' : '완료로 변경'}
      >
        {todo.completed ? '✓' : ''}
      </button>
      <span className="todo-item__text">{todo.text}</span>
      <button
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
        aria-label="삭제"
      >
        ×
      </button>
    </li>
  );
}
