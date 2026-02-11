/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import classNames from 'classnames';
import { Header } from './components/Header';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'completed'>(
    'all',
  );

  const activeTodosCounter = todos.filter(todo => !todo.completed).length;

  const filteredTodos = todos.filter(todo => {
    if (filterBy === 'active') {
      return !todo.completed;
    }

    if (filterBy === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    setErrorMessage(null);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = window.setTimeout(() => setErrorMessage(null), 3000);

    return () => window.clearTimeout(timerId);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <div
                data-cy="Todo"
                className={classNames('todo', { completed: todo.completed })}
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => {}}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being deleted or updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
            {/* This is a completed todo */}

            {/* This todo is an active todo */}

            {/* This todo is being edited */}

            {/* This todo is in loadind state */}
          </section>
        )}
        {/* Hide the footer if there are no todos */}
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
                onClick={() => setFilterBy('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterBy === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterBy('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterBy === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterBy('completed')}
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
        <Footer
          todos={todos}
          activeTodosCounter={activeTodosCounter}
          filterBy={filterBy}
          onFilterChange={setFilterBy}
        />
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {/* show only one message at a time */}
        {errorMessage}
        {/*<br />*/}
        {/*Title should not be empty*/}
        {/*<br />*/}
        {/*Unable to add a todo*/}
        {/*<br />*/}
        {/*Unable to delete a todo*/}
        {/*<br />*/}
        {/*Unable to update a todo*/}
      </div>
    </div>
  );
};
