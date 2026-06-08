import type { Filter } from '../types/todo';

interface Props {
  current: Filter;
  activeCount: number;
  completedCount: number;
  onChange: (filter: Filter) => void;
  onClearCompleted: () => void;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '미완료' },
  { value: 'completed', label: '완료' },
];

export function TodoFilter({
  current,
  activeCount,
  completedCount,
  onChange,
  onClearCompleted,
}: Props): React.JSX.Element {
  return (
    <div className="todo-filter">
      <span className="todo-filter__count">{activeCount}개 남음</span>
      <div className="todo-filter__buttons">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            className={`todo-filter__btn${current === value ? ' todo-filter__btn--active' : ''}`}
            onClick={() => onChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className="todo-filter__clear" onClick={onClearCompleted}>
          완료 삭제
        </button>
      )}
    </div>
  );
}
