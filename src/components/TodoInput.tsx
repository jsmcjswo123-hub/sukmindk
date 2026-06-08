import { useState, useId } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: Props): React.JSX.Element {
  const [value, setValue] = useState('');
  const inputId = useId();

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    onAdd(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <label htmlFor={inputId} className="sr-only">할 일 입력</label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="할 일을 입력하세요..."
        className="todo-input__field"
        autoFocus
      />
      <button type="submit" className="todo-input__btn" disabled={!value.trim()}>
        추가
      </button>
    </form>
  );
}
