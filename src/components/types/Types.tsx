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

export type Props = {
  handleOnBlur: (arg0: string) => void;
  value: string;
};

export type PropsItem = {
  item: ToDo;
};

export type ContextProps = {
  state: InitState;
  setState: (arg0: InitState) => void;
};
