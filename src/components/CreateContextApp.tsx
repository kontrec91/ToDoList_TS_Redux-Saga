import React, { useContext, FC, ReactElement, useState } from "react";
import { InitState } from "../App";
// export const ToDoContext = React.createContext<InitState | any>(undefined);


type ContextProps = {
    state: InitState;
    setState: (arg0: any)=> void;
    // setState: (arg0:Object)=> void;
    // setState: (obj: any) => void;
  }
  
export const ToDoContext = React.createContext({} as ContextProps);

// type State = {
//     state: {},
//     setState: ()=>void
// }

// const initStateObject: InitState = {//in file constants
//     todosArray: [],
//     filterType: "All",
//     isAllCompleted: false,
//   };

// const initState: State = {
//     state: initStateObject,
//     setState: (s: any)=>s
// };

// export const ToDoContext = React.createContext<Partial<InitState>>({});
// export const ToDoContext = React.createContext<State>(initState);


// import React from "react";
// // import { InitState } from "../App";

// type ToDo = {//in file types
//     isChecked: boolean;
//     value: string;
//     id: number;
//   };

// export type InitState = {//in file types
//     todosArray: ToDo[];
//     filterType: string;
//     isAllCompleted: boolean;
//   };

// export const ToDoContext = React.createContext<InitState|null>(null);


