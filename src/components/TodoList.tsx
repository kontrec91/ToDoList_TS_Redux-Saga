import React, { FC, ReactElement, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitState, ToDo } from "../types/Types";

import { SelectUserTodosArray, SelectFilterType, SelectUserId } from "../sagas/selector/selectors";

import { ItemToDo } from "./ItemToDo";

export const TodoList: FC = (): ReactElement => {

  const userId: string = useSelector(SelectUserId);
  const todosArray: ToDo[] = useSelector(SelectUserTodosArray);
  const filtertype: string = useSelector(SelectFilterType);

  // const SelectUserTodosArray: (state: InitState) => ToDo[] = state => state.todosArray;

  // const selectUserId: string = useSelector((state: InitState) => state.userId);
  // const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  // const selectFilterType: string = useSelector((state: InitState) => state.filterType);

  // export const SelectUserTodosArray = () => {
  //   const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  //   return selectUserTodosArray;
  // };

  // const filterType: string = SelectFilterType(state);
  // const todosArray: ToDo[] = SelectUserTodosArray(state);

  // const filteredArray: any = useMemo(() => {
  //   switch (filterType) {
  //     case "Active":
  //       return todosArray.filter((item) => item.isChecked === false);
  //     case "Completed":
  //       return todosArray.filter((item) => item.isChecked === true);
  //     default:
  //       return todosArray;
  //   }
  //   // }, [SelectFilterType(state), SelectUserTodosArray(state)]);
  // }, [filterType, todosArray]);

  const filteredArray: ToDo[] = useMemo(() => {
    switch (filtertype) {
      case "Active":
        return todosArray.filter((item) => item.isChecked === false);
      case "Completed":
        return todosArray.filter((item) => item.isChecked === true);
      default:
        return todosArray;
    }
    // }, [SelectFilterType(state), SelectUserTodosArray(state)]);
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
