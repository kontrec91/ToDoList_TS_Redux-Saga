import React, { FC, ReactElement, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitState, ToDo } from "../types/Types";

import { SelectUserTodosArray, SelectFilterType, state } from "../sagas/selector/selectors";

import { ItemToDo } from "./ItemToDo";

export const TodoList: FC = (): ReactElement => {
  // const selectUserId: string = useSelector((state: InitState) => state.userId);
  // const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  // const selectFilterType: string = useSelector((state: InitState) => state.filterType);

  // export const SelectUserTodosArray = () => {
  //   const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  //   return selectUserTodosArray;
  // };

  const filteredArray: any = useMemo(() => {
    switch (SelectFilterType(state)) {
      case "Active":
        return SelectUserTodosArray(state).filter((item) => item.isChecked === false);
      case "Completed":
        return SelectUserTodosArray(state).filter((item) => item.isChecked === true);
      default:
        return SelectUserTodosArray;
    }
  }, [SelectFilterType, SelectUserTodosArray]);

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