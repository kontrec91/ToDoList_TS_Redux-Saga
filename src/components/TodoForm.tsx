import React, { FC, useState, ReactElement, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitState, ToDo } from "./types/Types";
import { getUsersTodos, allTodosComplited } from "../actions/AuthActions";
import store from "../StoreSaga";
import { addToDoItem } from "../actions/AuthActions";

export const TodoForm: FC = (): ReactElement => {
  console.log("store", store.getState());

  const dispatch = useDispatch();

  const selectUserId: string = useSelector((state: InitState) => state.userId);
  const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  const selectIsAllCompleted: boolean = useSelector((state: InitState) => state.isAllCompleted);

  const [keyCode, setKeyCode] = useState<string>("");
  const [itemToDoValue, setItemToDoValue] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isAllCompleted, setIsAllCompleted] = useState<boolean>(false);

  useEffect(() => {
    addToDo();
  });

  useEffect(() => {
    if (selectUserId) {
      dispatch(getUsersTodos(selectUserId));
    }
  }, [selectUserId]);

  const addToDo = useCallback(() => {
    if (keyCode === "Enter" && itemToDoValue.trim() !== "") {
      dispatch(
        addToDoItem({
          itemTodo: {
            isChecked: false,
            todoValue: itemToDoValue,
            userId: selectUserId,
          },
          isAllCompleted: false,
          userId: selectUserId,
        })
      );
      setItemToDoValue("");
    }
  }, [itemToDoValue, keyCode]);

  const handleCheckAll = useCallback(() => {
    console.log("selectIsAllCompleted: ", selectIsAllCompleted);
    const newArray = selectUserTodosArray.map((item) => {
      return { ...item, isChecked: !item.isChecked };
    });
    const isCompleteTodos = !newArray.find((item: ToDo) => !item.isChecked);
    setIsAllCompleted(isCompleteTodos);
    setIsSelected(!isSelected);
    if (!selectIsAllCompleted) {
      //false
      // const newArray = selectUserTodosArray.map((item) => {
      //   return { ...item, isChecked: true };
      // });
      // const isCompleteTodos = !newArray.find((item: ToDo) => !item.isChecked);
      // setIsAllCompleted(isCompleteTodos);
      console.log("newArray", newArray, "setIsAllCompleted", isAllCompleted);
      // setIsSelected(true);
      dispatch(allTodosComplited(selectUserId, isAllCompleted)); //здесь берем только юзей ид и isAllCompleted
    } else {
      //true
      // const newArray = selectUserTodosArray.map((item) => {
      //   return { ...item, isChecked: false };
      // });
      // const isCompleteTodos = !newArray.find((item: ToDo) => !item.isChecked);
      // setIsAllCompleted(isCompleteTodos);
      console.log("newArray", newArray, "setIsAllCompleted", isAllCompleted);
      // setIsSelected(false);
      dispatch(allTodosComplited(selectUserId, isAllCompleted));
    }
  }, [selectIsAllCompleted, selectUserTodosArray, isAllCompleted]);

  return (
    <div className="header">
      <h1>ToDoList</h1>
      <div className="header-task">
        <span
          className={`${!selectUserTodosArray.length ? "hidden" : isSelected ? "checked" : ""} allComplete`}
          onClick={() => handleCheckAll()}
        ></span>
        <input
          value={itemToDoValue}
          className="input-goal"
          type="text"
          placeholder="What needs to be done"
          onKeyPress={(e) => setKeyCode(e.key)}
          autoFocus={true}
          onChange={(e) => setItemToDoValue(e.target.value)}
        />
      </div>
    </div>
  );
};
