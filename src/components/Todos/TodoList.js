import { useCallback, useEffect, useState } from "react";
import Todo from "./Todo";

const TodoList = ({
  todoList,
  onCheckBtnClick,
  deleteTodo,
  setTodoList,
  completed,
  completedCount,
  completedCountLeft,
  setStatus,
  lengthTodoList,
  status,
}) => {
  const deleteClearCompleted = () => {
    setTodoList(todoList.filter((todo) => todo.disabled === false));
  };
  return (
    <>
      <ul>
        {todoList
          ?.map((todo) => (
            <li key={todo.id}>
              <Todo
                todo={todo}
                onCheckBtnClick={onCheckBtnClick}
                deleteTodo={deleteTodo}
                completed={completed}
                todoList={todoList}
                setTodoList={setTodoList}
              />
            </li>
          ))
          .reverse()}
      </ul>
      {lengthTodoList > 0 && (
        <ul className="todobottom">
          <li>
            <span className="todo-count">
              <strong>
                {completedCountLeft() && completedCountLeft().length >= 0
                  ? completedCountLeft().length
                  : ""}
              </strong>{" "}
              item left
            </span>
          </li>
          <li>
            <ul className="action">
              <li>
                <a
                  href="#/all"
                  className={status === "all" ? "selected" : ""}
                  onClick={() => setStatus("all")}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  href="#/active"
                  className={status === "active" ? "selected" : ""}
                  onClick={() => setStatus("active")}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/completed"
                  className={`${status === "completed" ? "selected" : ""}`}
                  onClick={() => setStatus("completed")}
                >
                  Completed
                </a>
              </li>
            </ul>
          </li>
          <li>
            {completedCount().length > 0 ? (
              <span className="clear" onClick={deleteClearCompleted}>
                Clear completed
              </span>
            ) : (
              ""
            )}
          </li>
        </ul>
      )}

      {/* <div className="aa"></div>
      <div className="bb"></div> */}
    </>
  );
};

export default TodoList;
