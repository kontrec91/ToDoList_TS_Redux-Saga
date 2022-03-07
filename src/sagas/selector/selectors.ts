import { useSelector } from "react-redux";
import { InitState, ToDo } from "../../types/Types";
// import store from "../../StoreSaga";

// export const state: InitState = store.getState();

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

// export const SelectUserTodosArray = (state: InitState) => {
//     return state.todosArray;
// }

export const SelectUserTodosArray: (state: InitState) => ToDo[] = state => state.todosArray;

export const SelectFilterType: (state: InitState) => string = state => state.filterType;

export const SelectUserId: (state: InitState) => string = state => state.userId;

export const SelectIsAllCompleted: (state: InitState) => boolean = state => state.isAllCompleted;


// import { appState, setErrorTypeSelector, setFilterTypeSelector, setTodosTypeSelector, Todo } from "../../typescript/types";

// import { Todo } from "../../typescript/types";

// export const filterTypeSelector: (state: any) => string = state => state.todoReducer.type;

// export const getTodosSelector: (state: any) => Todo[] = state => state.todoReducer.todos;

// export const getErrorSelector: (state: any) => string = state => state.todoReducer.error;