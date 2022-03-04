import React, { FC, useState, ReactElement, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitState, ToDo } from "../types/Types";
import { getUserTodos, allTodosComplited } from "../sagas/actions/AuthActions";
import store from "../StoreSaga";
import { addToDoItem } from "../sagas/actions/AuthActions";
import { SelectUserId, SelectUserTodosArray, SelectIsAllCompleted, state } from "../sagas/selector/selectors";

export const TodoForm: FC = (): ReactElement => {
  console.log("store", store.getState());

  const dispatch = useDispatch();

  // const selectUserId: string = useSelector((state: InitState) => state.userId);
  // const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  // const selectIsAllCompleted: boolean = useSelector((state: InitState) => state.isAllCompleted);

  const [keyCode, setKeyCode] = useState<string>("");
  const [itemToDoValue, setItemToDoValue] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    addToDo();
  });

  useEffect(() => {
    if (SelectUserId(state)) {
      dispatch(getUserTodos(SelectUserId(state)));
    }
  }, [SelectUserId]);

  const addToDo = useCallback(() => {
    if (keyCode === "Enter" && itemToDoValue.trim() !== "") {
      dispatch(
        addToDoItem({
          itemTodo: {
            isChecked: false,
            todoValue: itemToDoValue,
            userId: SelectUserId(state),
          },
          isAllCompleted: false,
          userId: SelectUserId(state),
        })
      );
      setItemToDoValue("");
    }
  }, [itemToDoValue, keyCode]);

  const handleCheckAll = useCallback(() => {
    if (!SelectIsAllCompleted(state)) {
      const newArray = SelectUserTodosArray(state).map((item) => {
        return { ...item, isChecked: true };
      });
      const isCompleteTodos = !newArray.find((item: ToDo) => !item.isChecked);
      setIsSelected(true);
      dispatch(allTodosComplited(SelectUserId(state), isCompleteTodos, newArray));
    } else {
      const newArray = SelectUserTodosArray(state).map((item) => {
        return { ...item, isChecked: false };
      });
      const isCompleteTodos = !newArray.find((item: ToDo) => !item.isChecked);
      setIsSelected(false);
      dispatch(allTodosComplited(SelectUserId(state), isCompleteTodos, newArray));
    }
  }, [SelectIsAllCompleted, SelectUserTodosArray]);

  return (
    <div className="header">
      <h1>ToDoList</h1>
      <div className="header-task">
        <span
          className={`${!SelectUserTodosArray(state).length ? "hidden" : isSelected ? "checked" : ""} allComplete`}
          onClick={handleCheckAll}
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
