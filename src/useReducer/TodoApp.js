import React, { useEffect, useReducer } from "react";
import { useForm } from "../hooks/useForm";
import "./TodoApp.css";
import { todoReducer } from "./todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  const [{ description }, handleInputChange, reset] = useForm({
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (todoId) =>{
      console.log(todoId);

    const action = {
        type: 'delete',
        payload: todoId
    }
    dispatch(action)
  }

  const handleToggle = (todoId) =>{

    dispatch({
        type: 'toggle',
        payload: todoId
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      desc: description,
      done: false,
    };

    const action = {
      type: "add",
      payload: newTodo,
    };
    dispatch(action);
    reset();
  };

  return (
    <div>
      <h1>TodoList ({todos.length})</h1>
      <hr />
      <div className="grilla">
        <div>
          <ul>
            {todos.map((todo, i) => (
              <li key={todo.id}>
                <p className={todo.done && 'complete'} onClick={() =>{
                    handleToggle(todo.id)
                }}>
                  {i + 1} - {todo.desc}{" "}
                </p>
                <button onClick={ () =>{
                    handleDelete(todo.id)
                } }>Borrar</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Agregar ToDo</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleInputChange}
            />
            <button type="submit">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
