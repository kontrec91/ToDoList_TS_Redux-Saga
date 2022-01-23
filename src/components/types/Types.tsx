export type ToDo = {
  isChecked: boolean;
  value: string;
  id: number;
};

export type InitState = {
  todosArray: ToDo[];
  filterType: string;
  isAllCompleted: boolean;
};
