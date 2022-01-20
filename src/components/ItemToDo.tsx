import React, { useState, useContext } from "react";
import { ChangeInput } from "./ChangeInput";
import { ToDoContext } from "./CreateContextApp.js";

export const ItemToDo = (props) => {
  const item = props.item

  const [context, setContext] = useContext(ToDoContext);
  const { todosArray } = context;

  const [isChecked, setIsChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const checkboxHandler = () => {
    const newArray = todosArray.map((todo) => {
      if (todo.id === item.id) {
        return {
          ...todo,
          isChecked: !todo.isChecked,
        };
      } else {
        return todo;
      }
    });
    setContext({
      ...context,
      todosArray: newArray,
      isAllCompleted: !newArray.find((item) => !item.isChecked),
    });
    isChecked === false ? setIsChecked(true) : setIsChecked(false);
  };

  const handleDoubleClick = () => {
    isEdit === false ? setIsEdit(true) : setIsEdit(false);
  };

  const handleOnBlur = (value) => {//fix it
    if (value !== "") {
      const newArr = todosArray.map((todo) => {
        if (todo.id === item.id) {
          return {
            ...todo,
            value: value,
          };
        } else {
          return todo;
        }
      });

      setContext({
        ...context,
        todosArray: newArr
      });
    }
    setIsEdit(false);
  };

  const removeItem = () => {
    const newArray = todosArray.filter((todo) => todo.id !== item.id);
    setContext({
      ...context,
      todosArray: newArray,
      isAllCompleted: !newArray.find((todo) => !todo.isChecked),
    });
  };

  return (
    <li className="item-text">
      {isEdit === true ? (
        <ChangeInput handleOnBlur={handleOnBlur} value={item.value} />
      ) : (
        <>
          <input
            checked={item.isChecked}
            onChange={() => checkboxHandler()}
            type="checkbox"
            className="item-checkbox"
          />
          <label
            className={item.isChecked ? "check list-item-li-done" : "check"}
            htmlFor={item.id}
            onClick={() => checkboxHandler()}
          ></label>
          <span
            className={item.isChecked ? "text-li list-item-label-done list-item-li-done" : "text-li"}
            onDoubleClick={() => handleDoubleClick()}
          >
            {item.value}
          </span>
          <span className="delete" onClick={() => removeItem()}>
            ×
          </span>
        </>
      )}
    </li>
  );
};
