import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import TodoList from "../../components/TodoList";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
ListPage.propTypes = {};

function ListPage(props) {
  const todolist = [
    {
      id: 1,
      title: "eat",
      status: "new",
    },
    {
      id: 2,
      title: "sleep",
      status: "completed",
    },
    {
      id: 3,
      title: "code",
      status: "new",
    },
  ];

    const location = useLocation();
    const history = useHistory();
  const match = useRouteMatch();

  const [todoList, setTodoList] = useState(todolist);
  const [filters, setFilters] = useState(() => {
  const paramString = queryString.parse(location.search);
    return paramString.status || 'all';
  });

  function handleTodoClick(todo, index) {
    const newTodoList = [...todoList];
    newTodoList[index] = {
      ...newTodoList[index],
      status: newTodoList[index].status === "new" ? "completed" : "new",
    };
    setTodoList(newTodoList);
  }

 
  useEffect(() => {
      const paramString = queryString.parse(location.search);
       setFilters(paramString.status || 'all')
  }, [location.search])
  

  const renderTodoList = useMemo(() => {
    return filters === "all" ? todoList : todoList.filter((todo) => todo.status === filters);
  }, [todoList, filters]);

  function handleShowAll() {
    const queryParams = { status: 'all' };
    history.push({
      pathname: `${match.path}`,
      search: queryString.stringify(queryParams)
    })
  }

  function handleShowCompleted() {
    const queryParams = { status: "completed" };
    history.push({
      pathname: `${match.path}`,
      search: queryString.stringify(queryParams),
    });
  }

  function handleShowNew() {
    const queryParams = { status: "new" };
    history.push({
      pathname: `${match.path}`,
      search: queryString.stringify(queryParams),
    });
  }




  return (
    <div>
      <h3>todolist</h3>
      <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />
      <button onClick={handleShowAll}>Show All</button>
      <button onClick={handleShowCompleted}>Show completed</button>
      <button onClick={handleShowNew}>Show new</button>
    </div>
  );
}

export default ListPage;
