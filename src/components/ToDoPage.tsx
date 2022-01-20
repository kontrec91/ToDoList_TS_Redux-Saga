import React from "react";

import { TodoForm } from "./TodoForm.js";
import { Footer } from "./Footer.js";
import { TodoList } from "./TodoList.js";


export const ToDoPage = () => {
  
  return (
      <section className="dotoApp">
        <TodoForm />
        <TodoList />
        <Footer />
      </section>
  );
};
