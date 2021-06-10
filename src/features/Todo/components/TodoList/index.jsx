import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import './style.scss'
TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
  todoList: [],
  onTodoClick : null,
};

function TodoList(props) {
  const { todoList, onTodoClick } = props;

    
    function handleClick(todo,index) {
        if (!onTodoClick) return;
        onTodoClick(todo, index);
   } 
  return (
    <ul className="todo-list">
      {todoList.map((todo,index) => (
        <li
              key={todo.id}
              className={classnames({ completed: todo.status === "completed" })}
              onClick={()=> handleClick(todo,index)}
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
