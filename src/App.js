import logo from "./logo.svg";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import TodoList from "./components/Todos/TodoList";
import "./App.css";
const TODO_APP_STORAGE_KEY = "TODO_APP";
const hanleShow = (todoLists = [], type) => {
  switch (type) {
    case "active":
      return todoLists.filter((todo) => todo.disabled === false);
    case "completed":
      return todoLists.filter((todo) => todo.disabled === true);
    default:
      return todoLists;
  }
};
function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [status, setStatus] = useState("All");
  const [completed, setcompleted] = useState(false);

  let todoApp;
  useEffect(() => {
    todoApp = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (todoApp) {
      setTodoList(JSON.parse(todoApp));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);
  const handleOnChange = (e) => {
    setTextInput(([e.target.name] = e.target.value));
  };
  const addNewTodoList = useCallback(() => {
    if (!textInput) {
      return;
    }
    setTodoList([
      ...todoList,
      { id: v4(), name: textInput, disabled: false, completed: false },
    ]);
    setTextInput("");
  }, [textInput, todoList]);
  const onCheckBtnClick = (id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id
          ? { ...todo, disabled: !completed, completed: !completed }
          : todo
      )
    );
    setcompleted(!completed);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTodoList();
    }
  };
  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id != id));
  };
  const handleToggleAll = () => {
    setTodoList(
      todoList.map((todo) => {
        return { ...todo, disabled: !completed, completed: !completed };
      })
    );
    setcompleted(!completed);
  };
  const completedCount = () => {
    const cout = todoList?.filter((todo) => todo.completed === true);
    return cout;
  };
  const completedCountLeft = () => {
    const cout = todoList?.filter((todo) => todo.completed === false);
    return cout;
  };
  const lengthTodoList = todoList?.length;
  return (
    <div className="app">
      <div className="todoapp">
        <h1>Todos</h1>
        <div className="todolist">
          {todoList?.length > 0 && (
            <i
              className={
                completedCount()?.length < todoList.length
                  ? "fa-solid fa-chevron-down activeToggle"
                  : "fa-solid fa-chevron-down toggle-all"
              }
              onClick={handleToggleAll}
            ></i>
          )}

          <input
            name="textInput"
            placeholder="What needs to be done?"
            value={textInput}
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
          />
          <TodoList
            setTodoList={setTodoList}
            todoList={hanleShow(todoList, status)}
            status={status}
            onCheckBtnClick={onCheckBtnClick}
            deleteTodo={deleteTodo}
            completed={completed}
            completedCount={completedCount}
            completedCountLeft={completedCountLeft}
            setStatus={setStatus}
            lengthTodoList={lengthTodoList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
