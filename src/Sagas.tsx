// import axios from "axios";
// import * as actions from "./constants/constants";
import { call, put, takeEvery, all } from "redux-saga/effects";

import {
  ResponseGenerator,
  Credentials,
  UserAction,
  ActionGetTodos,
  ActionAddTodo,
  ActionDeleteToDo,
  createToDo,
  ToDo,
  ActionChangeItemToDo,
  ActionCheckItemToDo,
  ActionClearCompletedToDo,
  ActionSetFilter,
  ActionToDo
} from "./types/Types";


import {createUser} from "./api/createUser";
import {userLogin} from "./api/userLogin";
import {getUserTodos} from "./api/getUserTodos";
import {addItemToDo} from "./api/addItemToDo";
import {switchAllUserToDo} from "./api/switchAllUserToDo";
import {deleteItemToDo} from "./api/deleteItemToDo";
import {changeItemToDo} from "./api/changeItemToDo";
import {checkItemToDo} from "./api/checkItemToDo";
import {clearCompletedToDo} from "./api/clearCompletedToDo";
import {logOutUser} from "./api/logOutUser";


function* workerSagaRegistration(payload: UserAction) {
  try {
    const res: string = yield call(createUser, payload.payload);
    if (res) {
      yield put({ type: "INIT_REGISTRATION_SUCCESS", payload: res });
    } else {
      throw new Error("Could not get response");
    }
  } catch (e) {
  }
}

function* workerSagaLogin(payload: UserAction) {
  try {
    const res: string = yield call(userLogin, payload.payload);
    if (res) {
      yield put({ type: "LOG_IN_START_SUCCESS", payload: res });
    } else {
      yield put({ type: "LOG_IN_START_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (e) {
  }
}

function* workerSagaLogOut() {
  logOutUser();
  yield put({ type: "LOG_OUT_SUCCESS" });
}

function* workerSagaGetUserTodos(payload: ActionGetTodos) {
  try {
    const response: ResponseGenerator = yield call(getUserTodos, payload.payload);
    if (response) {
      yield put({ type: "GET_USER_DATA_SUCCESS", payload: response.data });
    } else {
      yield put({ type: "LOG_IN_START_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (e) {
  }
}

function* workerSagaAllTodosComptited(payload: {
  payload: { userId: string; isAllCompleted: boolean; todosArray: ToDo[] };
  type: string;
}) {
  const response: ResponseGenerator = yield call(switchAllUserToDo, payload.payload);
  try {
    if (response) {
      yield put({
        type: "ALL_TODOS_COMPLITED_SUCCESS",
        payload: { isAllCompleted: payload.payload.isAllCompleted, todosArray: payload.payload.todosArray },
      });
    } else {
      yield put({ type: "ALL_TODOS_COMPLITED_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
  }
}

function* workerSagaAddToDoItem(payload: ActionAddTodo) {
  const response: ResponseGenerator = yield call(addItemToDo, payload.payload);
  try {
    if (response) {
      yield put({
        type: "ADD_ITEMTODO_SUCCESS",
        payload: { response: response, isAllCompleted: payload.payload.isAllCompleted },
      });
    } else {
      yield put({ type: "ADD_ITEMTODO_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
  }
}

function* workerSagaDeleteItem(payload: ActionDeleteToDo) {
  const response: ResponseGenerator = yield call(deleteItemToDo, payload.payload); // response ==200?   yield put({ type: "DELETE_ITEMTODO_SUCCESS", payload: response.data });
  try {
    if (response) {
      const todosArray: ToDo[] = payload.payload.todosArray.filter((item) => item._id !== payload.payload.itemTodoId);
      yield put({
        type: "DELETE_ITEMTODO_SUCCESS",
        payload: { todosArray: todosArray, isAllCompleted: payload.payload.isAllCompleted },
      });
    } else {
      yield put({ type: "ADD_ITEMTODO_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
  }
}

function* workerSagaChangeItemToDo(payload: ActionChangeItemToDo) {
  const response: ResponseGenerator = yield call(changeItemToDo, payload.payload);
  try {
    if (response) {
      const todosArray: ToDo[] = payload.payload.todosArray.map((item) => {
        if (item._id === payload.payload.itemTodoId) {
          item.todoValue = payload.payload.itemTodoValue;
        }
        return item;
      });
      yield put({ type: "CHANGE_ITEMTODO_VALUE_SUCCESS", payload: todosArray });
    } else {
      yield put({ type: "CHANGE_ITEMTODO_VALUE_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
  }
}

function* workerSagaCheckItemToDo(payload: ActionCheckItemToDo) {
  const response: ResponseGenerator = yield call(checkItemToDo, payload.payload);
  try {
    if (response) {
      const todosArray: ToDo[] = payload.payload.todosArray.map((item) => {
        if (item._id === payload.payload.itemTodoId) {
          item.isChecked = !item.isChecked;
        }
        return item;
      });
      yield put({
        type: "CHECK_ITEMTODO_SUCESESS",
        payload: { todosArray: todosArray, isAllcompleted: payload.payload.isAllCompleted },
      });
    } else {
      yield put({ type: "CHECK_ITEMTODO_VALUE_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
  }
}

function* workerSagaClearCompletedToDo(payload: ActionToDo) {
//   const response: ResponseGenerator = yield call(clearCompletedToDo, payload.payload);
  console.log('authToken start')
  const response: ResponseGenerator = yield call(clearCompletedToDo, localStorage.authToken);
  try {
    if (response.status === 200) {
      yield put({
        type: "CLEAR_COMPLETEDTODO_SUCESESS",
        payload: { filteredArr: payload.payload.filteredArr, filterType: payload.payload.filterType },
      });
    }
    // if (response.status === 401) {
    //   console.log('STATUS 401! IN workerSagaClearCompletedToDo ')
    //   // const resp = refreshTokens(payload.payload.userId, clearCompletedToDo, payload.payload);
    //   // ЗАПУСКАТЬ ТУТ refreshTokens А НЕ ВНУТРИ clearCompletedToDo
    //   // if (resp:any) {
    //   //   yield put({
    //   //     type: "CLEAR_COMPLETEDTODO_SUCESESS",
    //   //     payload: { filteredArr: payload.payload.filteredArr, filterType: payload.payload.filterType },
    //   //   });
    //   // }
    // }
  } catch (error: any) {
    // yield put({ type: "CLEAR_COMPLETEDTODO_FAILED" });
    if (error.response.status === 401) {
      // console.log("params.userId!!!!!!!!!!!!!!!!!!!!!!!!",  payload.payload.userId);
      //  refreshTokens( payload.payload.userId, clearCompletedToDo,  payload.payload);
      console.log('authToken failed, refreshToken start');
      const response: ResponseGenerator = yield call(clearCompletedToDo, localStorage.refreshToken);
    } 
  }
}

function* workerSagaSetFilterType(payload: ActionSetFilter) {
  try {
    if (payload.payload) {
      yield put({ type: "SET_FILTERTYPE_SUCCESS", payload: payload.payload });
    } else {
      yield put({ type: "SET_FILTERTYPE__FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
    // (401?)
    // refreshTokens
  }
}

// async function refreshTokens(userId: string, callback: any, params: any) {
//   //after run code reducer must know what to do
//   // async function refreshTokens(params: {userId: string, callback: any, params: any}) {
//   const resp = await axios
//     .post("http://127.0.0.1:3001/refresh", {
//       userId: userId,
//     })
//     .then(
//       async (response) => {
//         localStorage.setItem("authToken", response.data.accesToken);
//         if (callback) {
//           await callback(params);
//         }
//         // return response.data.userID;
//       },
//       (error) => {
//       }
//     );
//   return resp;
// }

// function* workerSagaRefreshTokens(userId: string) {
//   //////////&&&&&&&&&&&&&&&&????????????????? need login here
//   const response: ResponseGenerator = yield call(refreshTokens, userId, null, null);
//   try {
//     if (response) {
//       yield put({
//         type: "CREATE_TOKENS_SUCESESS",
//         payload: {},
//       });
//     } else {
//       yield put({ type: "CREATE_TOKENS_FAILED" });
//       throw new Error("Could not get response");
//     }
//   } catch (error) {
//   }
// }

export function* watchSagaTodos() {
  yield takeEvery("GET_USER_DATA_REQUEST", workerSagaGetUserTodos);
  yield takeEvery("ALL_TODOS_COMPLITED_REQUEST", workerSagaAllTodosComptited);
  yield takeEvery("CLEAR_COMPLETEDTODO_REQUEST", workerSagaClearCompletedToDo);
  yield takeEvery("SET_FILTERTYPE_REQUEST", workerSagaSetFilterType);
}

export function* watchSagaItemTodo() {
  yield takeEvery("ADD_ITEMTODO_REQUEST", workerSagaAddToDoItem);
  yield takeEvery("DELETE_ITEMTODO_REQUEST", workerSagaDeleteItem);
  yield takeEvery("CHANGE_ITEMTODO_VALUE_REQUEST", workerSagaChangeItemToDo);
  yield takeEvery("CHECK_ITEMTODO_REQUEST", workerSagaCheckItemToDo);
}

export function* watchSagaUser() {
  yield takeEvery("LOG_IN_START_REQUEST", workerSagaLogin);
  yield takeEvery("LOG_OUT_REQUEST", workerSagaLogOut);
  yield takeEvery("INIT_REGISTRATION_REQUEST", workerSagaRegistration);
  // yield takeEvery ("REFRESH_TOKENS_REQUEST", workerSagaRefreshTokens);
}

export function* rootSaga() {
  yield all([watchSagaUser(), watchSagaItemTodo(), watchSagaTodos()]);
}
