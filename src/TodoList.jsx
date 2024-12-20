
import React from "react";
import Todo from './Todo';

const TodoList = ({ todos, onTodoChecked, onTodoDelete }) => (
  <ul className="todo-list">
    {todos.map((todo, index) => (
      <React.Fragment key={index}>
        {index === 0 || todo.date !== todos[index - 1].date ? (
          <div className="date-section">{todo.date}</div>
        ) : null}
        <Todo
          todo={todo}
          onTodoChecked={onTodoChecked(index)}
          onTodoDelete={onTodoDelete(index)}
        />
      </React.Fragment>
    ))}
  </ul>
);

export default TodoList;
