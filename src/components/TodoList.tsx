import React, { FC, ReactElement, useContext } from "react";

import { ItemToDo } from "./ItemToDo";
import { ToDoContext } from "./CreateContextApp";

export const TodoList: FC = (): ReactElement => {
  const [context] = useContext(ToDoContext);
  const { filterType, todosArray } = context;

  const filteredArray = () => {
    switch (filterType) {
      case "Active":
        return todosArray.filter((item: any) => item.isChecked === false);
      case "Completed":
        return todosArray.filter((item: any) => item.isChecked === true);
      default:
        return todosArray;
    }
  };

  return (
    <div className="main">
      <ul className="todoList">
        {filteredArray().map((item: any) => {
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
