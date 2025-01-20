import { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledApp = styled.div``;

export function App() {
  return (
    <>
      <Todos display />
    </>
  );
}

type Todo = {
  id: number;
  title: string;
  completed: 'true' | 'false';
};

export function Todos({}: PropsWithChildren) {
  const [display, setDisplay] = useState(true);
  if (!display) {
    return;
  }

  const [todos, setTodos] = useState([]);
  const [todoCount, setTodoCount] = useState(0);
  const [todosIsLoading, setTodosIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState('false');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/todos');
      const result = await response.json();
      setTodos(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTodoCount(todos.length);
  }, [todos]);

  function toggleCompleted(id) {
    let match = todos.find((todo) => todo.id === id);
    match.completed = match?.completed === 'true' ? 'false' : 'true';
    setTodos([...todos, { completed: match.completed }]);
  }

  function saveNewTodo(e) {
    e.preventDefault();
    setTodos([...todos, { title, completed }]);
  }

  return (
    <div>
      <button onClick={() => setDisplay(!display)}>Toggle Todos</button>
      <h2>Total Todos: {todoCount}</h2>
      {todos.map((todo) => (
        <li>
          <button onClick={toggleCompleted(todo.id)}>
            {todo.title}: {todo.completed}
          </button>
        </li>
      ))}
      <br />
      <form onSubmit={saveNewTodo}>
        Title:{' '}
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        Completed:{' '}
        <input
          type="text"
          name="completed"
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add new todo</button>
      </form>
    </div>
  );
}

export default App;
