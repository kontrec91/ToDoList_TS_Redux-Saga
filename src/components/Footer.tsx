import React, { FC, ReactElement, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitState, ToDo } from "./types/Types";
import { setFilterType, clearCompletedToDo} from "../actions/AuthActions";

export const Footer: FC = (): ReactElement => {
  const selectUserId: string = useSelector((state: InitState) => state.userId);
  const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  const selectFilterType: string = useSelector((state: InitState) => state.filterType);

  const dispatch = useDispatch();

  const showCountItems = useMemo(() => {
    const arr = selectUserTodosArray.filter((item) => item.isChecked !== true);
    return arr.length;
  }, [selectUserTodosArray]);

  const showClearCompletedButton = useMemo(() => {
    const isCompleted = selectUserTodosArray.some((item) => item.isChecked === true);
    return isCompleted;
  }, [selectUserTodosArray]);

  const handleSetFilterType = useCallback(
    (value: string) => {
      dispatch(setFilterType(value));
    },
    [selectUserTodosArray, selectFilterType]
  );

  const handlerClearCompleted = useCallback(() => {
    const fileredArr = selectUserTodosArray.filter((todo) => todo.isChecked === false);
    dispatch(clearCompletedToDo(fileredArr, selectUserId, "All"));
  }, [ selectUserTodosArray]);

  return (
    <div className={`${!selectUserTodosArray.length ? "hidden" : ""} footer`}>
      <span className="number-items-left">{showCountItems} items left</span>
      <button
        onClick={() => handleSetFilterType("All")}
        className={`${selectFilterType === "All" ? "active" : ""} all-button`}
      >
        All
      </button>
      <button
        onClick={() => handleSetFilterType("Active")}
        className={`${selectFilterType === "Active" ? "active" : ""} active-button`}
      >
        Active
      </button>
      <button
        onClick={() => handleSetFilterType("Completed")}
        className={`${selectFilterType === "Completed" ? "active" : ""} completed-button`}
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
