import { InitState, ToDo } from "../../types/Types";


export const SelectUserTodosArray: (state: InitState) => ToDo[] = state => state.todosArray;

export const SelectFilterType: (state: InitState) => string = state => state.filterType;

export const SelectUserId: (state: InitState) => string = state => state.userId;

export const SelectIsAllCompleted: (state: InitState) => boolean = state => state.isAllCompleted;