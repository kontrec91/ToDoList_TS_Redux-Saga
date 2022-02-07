import { InitState } from "../components/types/Types";
import * as actions from "../constants/constants";
import * as authActions from "../actions/AuthActions";

const initialState: InitState = {
  email: "",
  password: "",
  name: "",
  todosArray: [],
  filterType: "All",
  isAllCompleted: false,
  userId: "",
};

export const reducer = (state = initialState, action: any) => {
  console.log("payload in reducer", action.payload, action.type);
  switch (action.type) {
    case "GET_USER_DATA_SUCCESS":
      return {
        ...state,
        todosArray: [...state.todosArray, ...action.payload],
      };

    case "INIT_REGISTRATION_SUCCESS":
      return {
        ...state,
        userId: action.payload,
      };

    case "LOG_IN_START_SUCCESS":
      return {
        ...state,
        userId: action.payload,
      };

    case "LOG_OUT_SUCCESS":
      return initialState;

    case "ALL_TODOS_COMPLITED_SUCCESS":
      return {
        ...state,
        todosArray: [...action.payload.data],
        isAllCompleted: action.payload.isAllCompleted,
      };

    case "ADD_ITEMTODO_SUCCESS":
      return {
        ...state,
        todosArray: [...state.todosArray, action.payload.response],
        isAllCompleted: action.payload.isAllCompleted,
      };

    case "DELETE_ITEMTODO_SUCCESS":
      return {
        ...state,
        todosArray: [...action.payload],
      };

    case "CHANGE_ITEMTODO_VALUE_SUCCESS":
      return {
        ...state,
        todosArray: [...action.payload],
      };

    case "CHECK_ITEMTODO_SUCESESS":
      return {
        ...state,
        todosArray: [...action.payload],
      };
    case "SET_FILTERTYPE_SUCCESS":
      return {
        ...state,
        filterType: action.payload,
      };

    case "CLEAR_COMPLETEDTODO_SUCESESS":
      return {
        ...state,
        todosArray: [...action.payload.filteredArr],
        filterType: action.payload.filterType,
      };

    default:
      return state;
  }
};
