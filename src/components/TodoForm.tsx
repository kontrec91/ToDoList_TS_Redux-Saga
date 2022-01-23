import React, { FC, useState, ReactElement, useEffect, useContext } from "react";

import { ToDoContext } from "./CreateContextApp";

export const TodoForm: FC = (): ReactElement => {

  const context = useContext(ToDoContext);

  const { state, setState } = context;


  const { isAllCompleted, todosArray } = state;

  const [charCode, setCharCode] = useState(0);
  const [itemToDoValue, setItemToDoValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    addToDo();
  });

  const addToDo = () => {
    // ... = (type?) => {}
    if (charCode === 13 && itemToDoValue.trim() !== "") {
      setState({
        ...state,
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
      const newArray = todosArray.map((item: any) => {
        return { ...item, isChecked: true };
      });
      setState({
        ...state,
        todosArray: newArray,
        isAllCompleted: !newArray.find((item: any) => !item.isChecked),
      });
      setIsSelected(true);
    } else {
      const newArray = todosArray.map((item: any) => {
        return { ...item, isChecked: false };
      });
      setState({
        ...state,
        todosArray: newArray,
        isAllCompleted: !newArray.find((item: any) => !item.isChecked),
      });
      setIsSelected(false);
    }
  };

  return (
    <div className="header">
      <h1>ToDoList</h1>
      <div className="header-task">
        <span
          className={!todosArray.length ? "allComplete hidden" : isSelected ? "allComplete checked" : "allComplete"}
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
