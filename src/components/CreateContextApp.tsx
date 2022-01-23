import React from "react";
import { InitState } from "./types/Types";


type ContextProps = {
    state: InitState;
    setState: (arg0: InitState)=> void;
  }
  
export const ToDoContext = React.createContext({} as ContextProps);