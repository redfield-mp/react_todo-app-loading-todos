/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import classNames from 'classnames';
import { Header } from './components/Header';
import { TodosList } from './components/TodosList/TodosList';
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
        <TodosList todos={todos} filteredTodos={filteredTodos} />
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
      </div>
    </div>
  );
};
