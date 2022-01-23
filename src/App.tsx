import "./App.css";
import "./css/style.css";
import React,  { FC, useState, ReactElement } from "react";

import { ToDoContext } from "./components/CreateContextApp";

import { ToDoPage } from "./components/ToDoPage";

import { InitState } from "./components/types/Types";

const App: FC = (): ReactElement => {
  const initState: InitState = {
    todosArray: [],
    filterType: "All",
    isAllCompleted: false,
  };

  const [state, setState] = useState<InitState>(initState);
  return (
    <section className="dotoApp">
  
      <ToDoContext.Provider value={{state, setState}}>
        <ToDoPage />
      </ToDoContext.Provider>
    </section>
  );
};

export default App;
