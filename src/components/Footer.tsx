import React, { FC, ReactElement, useContext } from "react";

import { ToDoContext } from "./CreateContextApp";

export const Footer: FC = (): ReactElement => {
  const [context, setContext] = useContext(ToDoContext);
  const { filterType, todosArray } = context;

  const showCountItems = () => {
    const arr = todosArray.filter((item: any) => item.isChecked !== true);
    return arr.length;
  };

  const showClearCompletedButton = () => {
    const isCompleted = todosArray.some((item: any) => item.isChecked === true);
    return isCompleted;
  };

  const handleSetFilterType = (value: string) => {
    setContext({
      ...context,
      filterType: value,
    });
  };

  const handlerClearCompleted = () => {
    const fileredArr = todosArray.filter((todo: any) => todo.isChecked === false);

    setContext({
      ...context,
      todosArray: fileredArr,
      filterType: "All",
    });
  };

  return (
    <div className={todosArray.length ? "footer" : "footer hidden"}>
      <span className="number-items-left">{showCountItems()} items left</span>
      <button
        onClick={() => handleSetFilterType("All")}
        className={filterType === "All" ? "all-button active" : "all-button"}
      >
        All
      </button>
      <button
        onClick={() => handleSetFilterType("Active")}
        className={filterType === "Active" ? "active-button active" : "active-button"}
      >
        Active
      </button>
      <button
        onClick={() => handleSetFilterType("Completed")}
        className={filterType === "Completed" ? "completed-button active" : "completed-button"}
      >
        Completed
      </button>
      <button
        onClick={() => handlerClearCompleted()}
        className={showClearCompletedButton() ? "clear-completed-button" : "clear-completed-button hidden"}
      >
        Clear completed
      </button>
    </div>
  );
};
