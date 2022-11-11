import { useEffect, useRef, useState, memo } from "react";
import "./Todo.scss";
const Todo = ({ todo, onCheckBtnClick, deleteTodo, setTodoList, todoList }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editInput, setEditInput] = useState(todo.name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);
  const editTodo = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id == id ? { ...todo, name: editInput } : todo
      )
    );
  };
  const hanldleEditKeyDown = (e, id) => {
    if (e.key === "Enter") {
      editTodo(id);
      setIsEdit(false);
    }
  };
  const hanllClickEdit = () => {
    setIsEdit(true);
  };
  const hanllChangeEdit = (e) => {
    setEditInput(e.target.value);
  };
  const aaa = (id) => {
    if (!editInput) {
      deleteTodo(id);
    } else {
      editTodo(id);
      setIsEdit(false);
    }
  };
  return (
    <>
      <div className="todo">
        {isEdit ? (
          <input
            style={{
              marginLeft: "50px",
              padding: "12px 16px",
              width: "506px",
              fontSize: "24px",
              boxShadow: "inset 0 -1px 5px 0 rgb(0 0 0 / 20%)",
              border: "1px solid #999",
            }}
            ref={inputRef}
            type="text"
            onDoubleClick={hanllClickEdit}
            value={editInput}
            onKeyDown={(e) => hanldleEditKeyDown(e, todo.id)}
            onChange={(e) => hanllChangeEdit(e)}
            onBlur={() => aaa(todo.id)}
            name="editInput"
          />
        ) : (
          // <div className="item-todo">
          //   {arrCompleted?.length > 0 && todo.disabled === true && (
          //     <>
          //       <input
          //         style={{ cursor: "pointer" }}
          //         className="toggle"
          //         type="checkbox"
          //         onClick={() => onCheckBtnClick(todo.id)}
          //         defaultChecked={todo.disabled}
          //         checked={todo.disabled}
          //       />
          //       <label
          //         onClick={() => setIsEdit(true)}
          //         className={todo.disabled === false ? "add-todo" : "completed"}
          //       >
          //         {todo.name}
          //       </label>
          //     </>
          //   )}
          //   {arrActive?.length > 0 && todo.disabled === false && (
          //     <>
          //       <input
          //         style={{ cursor: "pointer" }}
          //         className="toggle"
          //         type="checkbox"
          //         onClick={() => onCheckBtnClick(todo.id)}
          //         defaultChecked={todo.disabled}
          //         checked={todo.disabled}
          //       />
          //       <label
          //         onClick={() => setIsEdit(true)}
          //         className={todo.disabled === false ? "add-todo" : "completed"}
          //       >
          //         {todo.name}
          //       </label>
          //     </>
          //   )}

          <>
            <input
              style={{ cursor: "pointer" }}
              className="toggle"
              type="checkbox"
              onClick={() => onCheckBtnClick(todo.id)}
              defaultChecked={todo.disabled}
              checked={todo.disabled}
            />
            <label
              onClick={() => setIsEdit(true)}
              className={todo.disabled === false ? "add-todo" : "completed"}
            >
              {todo.name}
            </label>
          </>

          // </div>
        )}

        <span>
          <i
            className="fa-solid fa-xmark delete-icon"
            onClick={() => deleteTodo(todo.id)}
          ></i>
        </span>
      </div>
    </>
  );
};
export default memo(Todo);
