import React, { FC, ReactElement, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitState, ToDo } from "../types/Types";
import {
  SelectIsAllCompleted,
  SelectFilterType,
  SelectUserId,
  SelectUserTodosArray,
  state,
} from "../sagas/selector/selectors";
import { setFilterType, clearCompletedToDo } from "../sagas/actions/AuthActions";

export const Footer: FC = (): ReactElement => {
  // const selectUserId: string = useSelector((state: InitState) => state.userId);
  // const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  // const selectFilterType: string = useSelector((state: InitState) => state.filterType);

  const dispatch = useDispatch();

  const showCountItems = useMemo(() => {
    const arr = SelectUserTodosArray(state).filter((item) => item.isChecked !== true);
    return arr.length;
  }, [SelectUserTodosArray]);

  const showClearCompletedButton = useMemo(() => {
    const isCompleted = SelectUserTodosArray(state).some((item) => item.isChecked === true);
    return isCompleted;
  }, [SelectUserTodosArray]);

  const handleSetFilterType = useCallback(
    (value: string) => {
      dispatch(setFilterType(value));
    },
    [SelectUserTodosArray, SelectFilterType]
  );

  const handlerClearCompleted = useCallback(() => {
    const fileredArr = SelectUserTodosArray(state).filter((todo) => todo.isChecked === false);
    dispatch(clearCompletedToDo(fileredArr, SelectUserId(state), "All"));
  }, [SelectUserTodosArray]);

  return (
    <div className={`${!SelectUserTodosArray(state).length ? "hidden" : ""} footer`}>
      <span className="number-items-left">{showCountItems} items left</span>
      <button
        onClick={() => handleSetFilterType("All")}
        className={`${SelectFilterType(state) === "All" ? "active" : ""} all-button`}
      >
        All
      </button>
      <button
        onClick={() => handleSetFilterType("Active")}
        className={`${SelectFilterType(state) === "Active" ? "active" : ""} active-button`}
      >
        Active
      </button>
      <button
        onClick={() => handleSetFilterType("Completed")}
        className={`${SelectFilterType(state) === "Completed" ? "active" : ""} completed-button`}
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
