import React, { FC, ReactElement, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitState, ToDo } from "./types/Types";

import { ItemToDo } from "./ItemToDo";

export const TodoList: FC = (): ReactElement => {
  const selectUserId: string = useSelector((state: InitState) => state.userId);
  const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  const selectFilterType: string = useSelector((state: InitState) => state.filterType);
  console.log("USERtODOS", selectUserTodosArray);

  const filteredArray = useMemo(() => {
    switch (selectFilterType) {
      case "Active":
        return selectUserTodosArray.filter((item) => item.isChecked === false);
      case "Completed":
        return selectUserTodosArray.filter((item) => item.isChecked === true);
      default:
        return selectUserTodosArray;
    }
  }, [selectFilterType, selectUserTodosArray]);

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
