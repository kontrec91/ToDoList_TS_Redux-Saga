import React, {FC, ReactElement, useState, useContext } from "react";
import { ChangeInput } from "./ChangeInput";
import { ToDoContext } from "./CreateContextApp";

type IProps = {
  item: any//item--это объект(item: Object), но код не генерит ошибку кагда item: any
  // item: Object 
}

// const App: FC = (): ReactElement => {
// export const ItemToDo<IProps> = (props: IProps) => {
export const ItemToDo: FC<IProps> = (props: IProps): ReactElement => {
  // const Layout: React.FC<OwnProps> = (props: OwnProps) => {}

  const item = props.item;

  const [context, setContext] = useContext(ToDoContext);
  const { todosArray } = context;

  const [isChecked, setIsChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const checkboxHandler = () => {
    const newArray = todosArray.map((todo: any) => {
      if (todo.id === item.id) {//тут ошибка
        return {
          ...todo,
          isChecked: !todo.isChecked,
        };
      } else {
        return todo;
      }
    });
    setContext({
      ...context,
      todosArray: newArray,
      isAllCompleted: !newArray.find((item: any) => !item.isChecked),
    });
    isChecked === false ? setIsChecked(true) : setIsChecked(false);
  };

  const handleDoubleClick = () => {
    isEdit === false ? setIsEdit(true) : setIsEdit(false);
  };

  const handleOnBlur = (value: string) => {
    //fix it
    if (value !== "") {
      const newArr = todosArray.map((todo: any) => {
        if (todo.id === item.id) {
          return {
            ...todo,
            value: value,
          };
        } else {
          return todo;
        }
      });

      setContext({
        ...context,
        todosArray: newArr,
      });
    }
    setIsEdit(false);
  };

  const removeItem = () => {
    const newArray = todosArray.filter((todo: any) => todo.id !== item.id);
    setContext({
      ...context,
      todosArray: newArray,
      isAllCompleted: !newArray.find((todo: any) => !todo.isChecked),
    });
  };

  return (
    <li className="item-text">
      {isEdit === true ? (
        <ChangeInput handleOnBlur={handleOnBlur} value={item.value} />
      ) : (
        <>
          <input
            checked={item.isChecked}
            onChange={() => checkboxHandler()}
            type="checkbox"
            className="item-checkbox"
          />
          <label
            className={item.isChecked ? "check list-item-li-done" : "check"}
            htmlFor={item.id}
            onClick={() => checkboxHandler()}
          ></label>
          <span
            className={item.isChecked ? "text-li list-item-label-done list-item-li-done" : "text-li"}
            onDoubleClick={() => handleDoubleClick()}
          >
            {item.value}
          </span>
          <span className="delete" onClick={() => removeItem()}>
            ×
          </span>
        </>
      )}
    </li>
  );
};
