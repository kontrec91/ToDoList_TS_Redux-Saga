import React, { FC, ReactElement } from "react";

import { TodoForm } from "./TodoForm";
import { Footer } from "./Footer";
import { TodoList } from "./TodoList";
import { UserLogOut } from "./UserLogOut";

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
