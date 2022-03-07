import React, { FC, ReactElement, useState, useCallback } from "react";
import { ChangeInput } from "./ChangeInput";
import { PropsItem } from "../types/Types";
import { useDispatch, useSelector } from "react-redux";
import { InitState, ToDo } from "../types/Types";
import { deleteItemToDo, changeItemTodoValue, checkItemToDo } from "../sagas/actions/AuthActions";
import { SelectUserId, SelectUserTodosArray, SelectFilterType } from "../sagas/selector/selectors";

export const ItemToDo: FC<PropsItem> = ({ item }: PropsItem): ReactElement => {
  const userId: string = useSelector(SelectUserId);
  const todosArray: ToDo[] = useSelector(SelectUserTodosArray);
  const filterType: string = useSelector(SelectFilterType);

  // const selectUserId: string = useSelector((state: InitState) => state.userId);
  // const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  // const selectFilterType: string = useSelector((state: InitState) => state.filterType);

  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const checkboxHandler = useCallback(() => {
    const isAllCompleted = !todosArray.find((item) => !item.isChecked);
    setIsChecked(!isChecked);
    dispatch(checkItemToDo(item._id, userId, todosArray, isAllCompleted));
  }, [isChecked, item._id, todosArray]);

  const handleDoubleClick = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  const handleOnBlur = useCallback(
    (value: string) => {
      if (value) {
        dispatch(changeItemTodoValue(value, item._id, userId, todosArray));
      }
      setIsEdit(false);
    },
    [item._id, todosArray]
  );

  const removeItem = useCallback(() => {
    const isAllCompleted = !todosArray.find((todo) => !todo.isChecked);
    dispatch(deleteItemToDo(item._id, userId, todosArray, isAllCompleted));
  }, [item, todosArray]);

  return (
    <li className="item-text">
      {isEdit ? (
        <ChangeInput handleOnBlur={handleOnBlur} value={item.todoValue} />
      ) : (
        <>
          <input
            checked={item.isChecked}
            onChange={() => checkboxHandler()}
            type="checkbox"
            className="item-checkbox"
          />
          <label
            className={`${item.isChecked ? "list-item-li-done" : ""} check`}
            htmlFor={`${item._id}`}
            onClick={() => checkboxHandler()}
          ></label>
          <span
            className={`${item.isChecked ? "list-item-label-done list-item-li-done" : ""} text-li`}
            onDoubleClick={() => handleDoubleClick()}
          >
            {item.todoValue}
          </span>
          <span className="delete" onClick={() => removeItem()}>
            ×
          </span>
        </>
      )}
    </li>
  );
};
