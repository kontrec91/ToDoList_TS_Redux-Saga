import React, { useEffect, useContext, useState } from "react";
import { ToDoContext } from "./CreateContextApp.js";

export const TodoForm = () => {
  const [context, setContext] = useContext(ToDoContext);
  const {isAllCompleted, todosArray} = context;


  const [charCode, setCharCode] = useState(0);
  const [itemToDoValue, setItemToDoValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    addToDo();
  });

  const addToDo = () => {
    if (charCode === 13 && itemToDoValue.trim() !== "") {
      setContext({
        ...context,
        todosArray: [
          ...todosArray,
          {
            isChecked: false,
            value: itemToDoValue,
            id: Date.now(),
          },
        ],
        isAllCompleted: false,
      });
      setItemToDoValue("");
    }
  };

  const handleCheckAll = () => {
    if (!isAllCompleted) {
      const newArray = todosArray.map((item) => {
        return { ...item, isChecked: true };
      });
      setContext({
        ...context,
        todosArray: newArray,
        isAllCompleted: !newArray.find((item) => !item.isChecked),
      });
      setIsSelected(true);
    } else {
      const newArray = todosArray.map((item) => {
        return { ...item, isChecked: false };
      });
      setContext({
        ...context,
        todosArray: newArray,
        isAllCompleted: !newArray.find((item) => !item.isChecked),
      });
      setIsSelected(false);
    }
  };

  return (
    <div className="header">
      <h1>ToDoList</h1>
      <div className="header-task">
        <span
          className={
            !todosArray.length ? "allComplete hidden" : isSelected ? "allComplete checked" : "allComplete"
          }
          onClick={() => handleCheckAll()}
        ></span>
        <input
          value={itemToDoValue}
          className="input-goal"
          type="text"
          placeholder="What needs to be done"
          onKeyPress={(e) => setCharCode(e.charCode)}
          autoFocus={true}
          onChange={(e) => setItemToDoValue(e.target.value)}
        />
      </div>
    </div>
  );
};