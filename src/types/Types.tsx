export type ToDo = {
  isChecked: boolean;
  todoValue: string;
  _id: string;
  userId: string;
};

export type createToDo = {
  isChecked: boolean;
  todoValue: string;
  userId: string;
};

export type ActionDeleteToDo = {
  type: string;
  payload: { itemTodoId: string; userId: string; todosArray: ToDo[], isAllCompleted: boolean };
};

export type ActionChangeItemToDo = {
  type: string;
  payload: { itemTodoValue: string; itemTodoId: string; userId: string; todosArray: ToDo[] };
};

export type ActionCheckItemToDo = {
  type: string;
  payload: { itemTodoId: string; userId: string; todosArray: ToDo[]; isAllCompleted: boolean };
};

export type ActionClearCompletedToDo = {
  type: string;
  payload: { filteredArr: ToDo[]; userId: string; filterType: string };
};

export type InitState = {
  todosArray: ToDo[];
  filterType: string;
  isAllCompleted: boolean;
  email: string;
  password: string;
  name: string;
  userId: string;
};

export type Credentials = {
  email: string;
  password: string;
  name: string;
};

export type ResponseGenerator = {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
};

export type UserAction = {
  type: string;
  payload: Credentials;
};

export type ActionGetTodos = {
  type: string;
  payload: string;
};

export type ActionSetFilter = {
  type: string;
  payload: string;
};

export type ActionAddTodo = {
  type: string;
  payload: { itemTodo: ToDo; isAllCompleted: boolean; userId: string };
};

export type Props = {
  handleOnBlur: (arg: string) => void;
  value: string;
};

export type PropsItem = {
  item: ToDo;
};


export type ActionToDo = {
  filteredArr: ToDo[];
  userId: string; 
  filterType: string
}