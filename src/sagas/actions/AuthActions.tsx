import { Credentials, ToDo, ActionAddTodo, createToDo, ActionCheckItemToDo } from "../../types/Types";

export const InitLogin = (credentials: Credentials) => ({
  type: "LOG_IN_START_REQUEST",
  payload: credentials,
});

export const InitRegistration = (credentials: Credentials) => ({
  type: "INIT_REGISTRATION_REQUEST",
  payload: credentials,
});

export const logOut = () => ({
  type: "LOG_OUT_REQUEST",
});

export const getUserTodos = (userId: string) => ({
  type: "GET_USER_DATA_REQUEST",
  payload: userId,
});

export const addToDoItem = (payload: { itemTodo: createToDo; isAllCompleted: boolean; userId: string }) => ({
  type: "ADD_ITEMTODO_REQUEST",
  payload,
});

export const deleteItemToDo = (itemTodoId: string, userId: string, todosArray: ToDo[], isAllCompleted: boolean) => ({
  type: "DELETE_ITEMTODO_REQUEST",
  payload: { itemTodoId, userId, todosArray, isAllCompleted },
});

export const changeItemTodoValue = (itemTodoValue: string, itemTodoId: string, userId: string, todosArray: ToDo[]) => ({
  type: "CHANGE_ITEMTODO_VALUE_REQUEST",
  payload: { itemTodoValue, itemTodoId, userId, todosArray },
});

export const checkItemToDo = (itemTodoId: string, userId: string, todosArray: ToDo[], isAllCompleted: boolean) => ({
  type: "CHECK_ITEMTODO_REQUEST",
  payload: { itemTodoId, userId, todosArray, isAllCompleted },
});

export const allTodosComplited = (userId: string, isAllCompleted: boolean, todosArray: ToDo[]) => ({
  type: "ALL_TODOS_COMPLITED_REQUEST",
  payload: { userId, isAllCompleted, todosArray },
});

export const setFilterType = (value: string) => ({
  type: "SET_FILTERTYPE_SUCCESS",
  payload: value,
});

export const clearCompletedToDo = (filteredArr: ToDo[], userId: string, filterType: string) => ({
  type: "CLEAR_COMPLETEDTODO_REQUEST",
  payload: { filteredArr, userId, filterType },
});
