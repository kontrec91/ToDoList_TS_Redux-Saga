import React, { FC, ReactElement, useState, useCallback } from "react";
import { ChangeInput } from "./ChangeInput";
import { PropsItem } from "./types/Types";
import { useDispatch, useSelector } from "react-redux";
import { InitState, ToDo } from "./types/Types";
import { deleteItemToDo, changeItemTodoValue, checkItemToDo } from "../actions/AuthActions";

export const ItemToDo: FC<PropsItem> = ({ item }: PropsItem): ReactElement => {
  const selectUserId: string = useSelector((state: InitState) => state.userId);
  const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
  const selectFilterType: string = useSelector((state: InitState) => state.filterType);

  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const checkboxHandler = useCallback(() => {
    console.log("check");
    //   const newArray = todosArray.map((todo) =>
    //     todo.id === item.id ? { ...todo, isChecked: !todo.isChecked } : { ...todo }
    //   );
    //   setState({
    //     ...state,
    //     todosArray: newArray,
    //     isAllCompleted: !newArray.find((item) => !item.isChecked),
    //   });
    setIsChecked(!isChecked);
    dispatch(checkItemToDo(item._id, selectUserId, selectUserTodosArray));
  }, [isChecked, item._id, selectUserTodosArray]);

  const handleDoubleClick = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  const handleOnBlur = useCallback(
    (value: string) => {
      if (value) {
        dispatch(changeItemTodoValue(value, item._id, selectUserId, selectUserTodosArray));
      }
      setIsEdit(false);
    },
    [item._id, selectUserTodosArray]
  );

  const removeItem = useCallback(() => {
    dispatch(deleteItemToDo(item._id, selectUserId, selectUserTodosArray));
    //isAllCompleted: !newArray.find((todo) => !todo.isChecked),
  }, [item, selectUserTodosArray]);

  // const removeItem = () => {
  //   console.log("delete: ", item);
  //   // const newArray = selectUserTodosArray.filter((todo) => {
  //   //   if(todo._id !== item._id){
  //   //     return todo
  //   //   }
  //   //   console.log('Deleted todo', todo,item )
  //   // });
  //   // console.log("filtered ARRAY:", newArray);
  //   //   setState({
  //   //     ...state,
  //   //     todosArray: newArray,
  //   //     isAllCompleted: !newArray.find((todo) => !todo.isChecked),
  //   //   });
  //   // dispatch(deleteItemToDo(newArray));
  // };

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
