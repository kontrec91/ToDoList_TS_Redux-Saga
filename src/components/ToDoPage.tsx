import React, { FC, ReactElement, useContext } from "react";
import { ToDoContext } from "./CreateContextApp";

import { TodoForm } from "./TodoForm";
import { Footer } from "./Footer";
import { TodoList } from "./TodoList";

export const ToDoPage: FC = (): ReactElement => {

  return (
    <section className="dotoApp">
      <TodoForm />
      {/* <TodoList /> */}
      {/* <Footer /> */}
    </section>
  );
};
