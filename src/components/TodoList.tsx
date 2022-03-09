import React, { FC, ReactElement, useMemo } from "react";
import { useSelector } from "react-redux";
import { ToDo } from "../types/Types";

import { SelectUserTodosArray, SelectFilterType, SelectUserId } from "../sagas/selector/selectors";

import { ItemToDo } from "./ItemToDo";

export const TodoList: FC = (): ReactElement => {

  // const userId: string = useSelector(SelectUserId);
  const todosArray: ToDo[] = useSelector(SelectUserTodosArray);
  const filtertype: string = useSelector(SelectFilterType);

  const filteredArray: ToDo[] = useMemo(() => {
    switch (filtertype) {
      case "Active":
        return todosArray.filter((item) => item.isChecked === false);
      case "Completed":
        return todosArray.filter((item) => item.isChecked === true);
      default:
        return todosArray;
    }
  }, [todosArray, filtertype]);

  return (
    <div className="main">
      <ul className="todoList">
        {filteredArray.map((item: ToDo) => {
          return (
            <ItemToDo key={item._id} item={item}>
              {item.todoValue}
            </ItemToDo>
          );
        })}
      </ul>
    </div>
  );
};
