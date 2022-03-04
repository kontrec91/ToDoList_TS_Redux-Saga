import { useSelector } from "react-redux";
import { InitState, ToDo } from "../../types/Types";
import store from "../../StoreSaga";

export const state: InitState = store.getState();

// export const SelectUserId = () => {
//   const selectUserId: string = useSelector((state: InitState) => state.userId);
//   return selectUserId;
// };

// export const SelectFilterType = () => {
//   const selectFilterType: string = useSelector((state: InitState) => state.filterType);
//   return selectFilterType;
// };

// export const SelectUserTodosArray = () => {
//   const selectUserTodosArray: ToDo[] = useSelector((state: InitState) => state.todosArray);
//   return selectUserTodosArray;
// };

// export const SelectIsAllCompleted = () => {
//   const selectIsAllCompleted: boolean = useSelector((state: InitState) => state.isAllCompleted);
//   return selectIsAllCompleted;
// };

// export const getTodosSelector: (state: TodoState) => Todo[] = (state) => state.todoReducer.todos;

export const SelectUserTodosArray: (state: InitState) => ToDo[] = (state: InitState) => state.todosArray;

export const SelectFilterType: (state: InitState) => string = (state: InitState) => state.filterType;

export const SelectUserId: (state: InitState) => string = (state: InitState) => state.userId;

export const SelectIsAllCompleted: (state: InitState) => boolean = (state: InitState) => state.isAllCompleted;
