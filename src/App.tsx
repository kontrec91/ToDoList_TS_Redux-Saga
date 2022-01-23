import "./App.css";
import "./css/style.css";
import React,  { FC, useState, ReactElement } from "react";

import { ToDoContext } from "./components/CreateContextApp";

import { ToDoPage } from "./components/ToDoPage";

type ToDo = {//in file types
  isChecked: boolean;
  value: string;
  id: number;
};

export type InitState = {//in file types
  todosArray: ToDo[];
  filterType: string;
  isAllCompleted: boolean;
};
//строгая типизация!!!! каждая переменная указывается со своим типом

const App: FC = (): ReactElement => {
  const initState: InitState = {//in file constants
    todosArray: [],
    filterType: "All",
    isAllCompleted: false,
  };

  const [state, setState] = useState<InitState>(initState);
  console.log('type: ', typeof setState, setState)
  return (
    <section className="dotoApp">
  
      <ToDoContext.Provider value={{state, setState}}>
      {/* <ToDoContext.Provider value={[state, setState]}>  нужно подставить объект вместо массива*/}
        <ToDoPage />
      </ToDoContext.Provider>
    </section>
  );
};

export default App;
