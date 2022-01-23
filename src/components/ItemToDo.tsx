import React, { FC, ReactElement, useState, useContext } from "react";
import { ChangeInput } from "./ChangeInput";
import { ToDoContext } from "./CreateContextApp";
import { ToDo, PropsItem } from "./types/Types";

export const ItemToDo: FC<PropsItem> = (props: PropsItem): ReactElement => {
  const item = props.item;
  const itemId = String(item.id);

  const { state, setState } = useContext(ToDoContext);
  const { todosArray } = state;

  const [isChecked, setIsChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const checkboxHandler = () => {
    const newArray = todosArray.map((todo: ToDo) => {
      if (todo.id === item.id) {
        return {
          ...todo,
          isChecked: !todo.isChecked,
        };
      } else {
        return todo;
      }
    });

    setState({
      ...state,
      todosArray: newArray,
      isAllCompleted: !newArray.find((item: ToDo) => !item.isChecked),
    });

    isChecked === false ? setIsChecked(true) : setIsChecked(false);
  };

  const handleDoubleClick = () => {
    isEdit === false ? setIsEdit(true) : setIsEdit(false);
  };

  const handleOnBlur = (value: string) => {
    if (value !== "") {
      const newArr = todosArray.map((todo: ToDo) => {
        if (todo.id === item.id) {
          return {
            ...todo,
            value: value,
          };
        } else {
          return todo;
        }
      });

      setState({
        ...state,
        todosArray: newArr,
      });
    }
    setIsEdit(false);
  };

  const removeItem = () => {
    const newArray = todosArray.filter((todo: ToDo) => todo.id !== item.id);

    setState({
      ...state,
      todosArray: newArray,
      isAllCompleted: !newArray.find((todo: ToDo) => !todo.isChecked),
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
            htmlFor={itemId}
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
