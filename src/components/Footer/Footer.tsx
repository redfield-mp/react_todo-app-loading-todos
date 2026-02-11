import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../../types/TodoFilter';

type FooterProps = {
  todos: Todo[];
  activeTodosCounter: number;
  filterBy: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
};

export const Footer = ({
  todos,
  activeTodosCounter,
  filterBy,
  onFilterChange,
}: FooterProps) => {
  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {activeTodosCounter} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filterBy === 'all',
              })}
              data-cy="FilterLinkAll"
              onClick={() => onFilterChange('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filterBy === 'active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => onFilterChange('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filterBy === 'completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => onFilterChange('completed')}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
