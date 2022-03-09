import React, { FC, ReactElement, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitState, ToDo } from "../types/Types";
import {
  SelectIsAllCompleted,
  SelectFilterType,
  SelectUserId,
  SelectUserTodosArray,
} from "../sagas/selector/selectors";
import { setFilterType, clearCompletedToDo } from "../sagas/actions/AuthActions";

export const Footer: FC = (): ReactElement => {

  // const userId: string = useSelector(SelectUserId);
  const todosArray: ToDo[] = useSelector(SelectUserTodosArray);
  const filterType: string = useSelector(SelectFilterType);

  const dispatch = useDispatch();

  const showCountItems = useMemo(() => {
    const arr = todosArray.filter((item) => item.isChecked !== true);
    return arr.length;
  }, [todosArray]);

  const showClearCompletedButton = useMemo(() => {
    const isCompleted = todosArray.some((item) => item.isChecked === true);
    return isCompleted;
  }, [todosArray]);

  const handleSetFilterType = useCallback(
    (value: string) => {
      dispatch(setFilterType(value));
    },
    [todosArray, filterType]
  );

  const handlerClearCompleted = useCallback(() => {
    const fileredArr = todosArray.filter((todo) => todo.isChecked === false);
    // dispatch(clearCompletedToDo(fileredArr, userId, "All"));
    dispatch(clearCompletedToDo(fileredArr, "All"));
  }, [todosArray]);

  return (
    <div className={`${!todosArray.length ? "hidden" : ""} footer`}>
      <span className="number-items-left">{showCountItems} items left</span>
      <button
        onClick={() => handleSetFilterType("All")}
        className={`${filterType === "All" ? "active" : ""} all-button`}
      >
        All
      </button>
      <button
        onClick={() => handleSetFilterType("Active")}
        className={`${filterType === "Active" ? "active" : ""} active-button`}
      >
        Active
      </button>
      <button
        onClick={() => handleSetFilterType("Completed")}
        className={`${filterType === "Completed" ? "active" : ""} completed-button`}
      >
        Completed
      </button>
      <button
        onClick={() => handlerClearCompleted()}
        className={`${!showClearCompletedButton ? "hidden" : ""} clear-completed-button`}
      >
        Clear completed
      </button>
    </div>
  );
};
