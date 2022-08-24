import { useState, React, useRef } from 'react';
import ToDoList from './ToDoList.jsx';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAdToDo = (e) => {
    e.preventDefault();
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}];
    });
    todoNameRef.current.value = null;
  }

  const handleClear = (e) => {
    e.preventDefault();
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  return (
    <div>
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
      <input type='text' ref={todoNameRef}></input>
      <button onClick={handleAdToDo}>タスクを追加</button>
      <button onClick={handleClear}>タスクの削除</button>
      <div>残りのタスク: {todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}

export default App;
