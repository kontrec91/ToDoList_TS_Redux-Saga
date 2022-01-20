import "./App.css";
import "./css/style.css";
import React, { useState } from "react";

import { ToDoContext } from "./components/CreateContextApp";

import { ToDoPage } from "./components/ToDoPage";

const App = () => {
  const [state, setState] = useState({
    todosArray: [],
    filterType: "All",
    isAllCompleted: false,
  });

  return (
    <section className="dotoApp">
      <ToDoContext.Provider value={[state, setState]}>
        <ToDoPage />
      </ToDoContext.Provider>
    </section>
  );
};

export default App;
