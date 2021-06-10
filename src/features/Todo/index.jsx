import React, { useState } from "react";
import PropTypes from "prop-types";
import TodoList from "./components/TodoList";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "../../components/NotFound";
import TodoForm from "./components/TodoForm";

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={ListPage} exact/>
        <Route path={`${match.path}/form`} component={TodoForm} exact/>
        <Route path={`${match.path}/:todoId`} component={DetailsPage} exact />
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default TodoFeature;
