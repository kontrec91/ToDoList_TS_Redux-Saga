import React, { FC, ReactElement } from "react";

import { TodoForm } from "../components/TodoForm";
import { Footer } from "../components/Footer";
import { TodoList } from "../components/TodoList";
import { UserLogOut } from "../components/UserLogOut";

export const ToDoPage: FC = (): ReactElement => {

  return (
    <>
      <UserLogOut />
      <TodoForm />
      <TodoList />
      <Footer />
    </>
  );
};