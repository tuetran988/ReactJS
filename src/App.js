import ColorBox from "./components/ColorBox";
import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import queryString from "query-string";
import PostFiltersForm from "./components/PostFiltersForm";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import TodoFeature from "./features/Todo";
import AlbumFeature from "./features/Album";
import NotFound from "./components/NotFound";
import productApi from "./api/productApi";
import ProductFeature from "./features/Product";
import Header from "./components/Header";
import CartFeature from "./features/Cart";
import Footer from "./components/Footer";
function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "javascript" },
    { id: 2, title: "java" },
    { id: 3, title: "php, python, switf" },
  ]);

  function handleTodoClick(todo) {
    const Newindex = todoList.findIndex((todos) => todos.id === todo.id);
    const newArray = [...todoList];
    newArray.splice(Newindex, 1);
    setTodoList(newArray);
  }
  function handleTodoFormSubmit(formValues) {
    const newTodoList = [...todoList];
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };

    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  //this is list todo != product
  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("error");
      }
    }
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    setFilters({ ...filters, _page: newPage });
  }

  function handleFiltersChange(newFilters) {
    console.log(newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await productApi.getAll(params);
      // console.log(productList)
    };
    fetchProducts();
  }, []);
  
  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Route path="/" component={ProductFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />

        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
