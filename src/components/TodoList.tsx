import React, { FC, ReactElement, useContext } from "react";

import { ItemToDo } from "./ItemToDo";
import { ToDoContext } from "./CreateContextApp";
import { ToDo } from "./types/Types";

export const TodoList: FC = (): ReactElement => {
  const { state } = useContext(ToDoContext);
  const { filterType, todosArray } = state;

  const filteredArray = () => {
    switch (filterType) {
      case "Active":
        return todosArray.filter((item: ToDo) => item.isChecked === false);
      case "Completed":
        return todosArray.filter((item: ToDo) => item.isChecked === true);
      default:
        return todosArray;
    }
  };

  return (
    <div className="main">
      <ul className="todoList">
        {filteredArray().map((item: ToDo) => {
          return (
            <ItemToDo key={item.id} item={item}>
              {item.value}
            </ItemToDo>
          );
        })}
      </ul>
    </div>
  );
};
