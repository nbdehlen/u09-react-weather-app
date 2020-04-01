import React, { Fragment, useState, useCallback } from 'react';
import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>;

interface InterfaceTodo {
  text: string;
  complete: boolean;
}

export const Todo: React.FC = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<InterfaceTodo[]>([]);

  const onTodoChange = useCallback((e) => setValue(e.target.value), []);

  const addTodo = useCallback(
    (text: string): void => {
      const newTodos: InterfaceTodo[] = [...todos, { text, complete: false }];
      setTodos(newTodos);
    },
    [todos],
  );

  const completeTodo = (index: number): void => {
    const newTodos: InterfaceTodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: InterfaceTodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleSubmit = useCallback(
    (e: FormElem): void => {
      e.preventDefault();
      addTodo(value);
      setValue('');
    },
    [addTodo, value],
  );

  return (
    <>
      <div>
        <h1> Todo </h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={onTodoChange} required />
          <button type="submit"> Add Todo </button>
        </form>
        <section>
          {todos.map((todo: InterfaceTodo, index: number) => (
            <Fragment key={index}>
              <div
                style={{
                  textDecoration: todo.complete ? 'line-through' : '',
                }}
              >
                {todo.text}
              </div>
              <button type="button" onClick={() => completeTodo(index)}>
                {todo.complete ? 'Incomplete' : 'Complete'}
              </button>
              <button type="button" onClick={() => removeTodo(index)}>
                Remove todo
              </button>
            </Fragment>
          ))}
        </section>
      </div>
    </>
  );
};
