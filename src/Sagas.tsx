import axios from "axios";
import * as actions from "./constants/constants";
import { call, put, takeEvery, all } from "redux-saga/effects";

// 1. убрать везде запросы на получение данных из бека
// 2. прокидывать масив тудушек в payload в экшене
// 3. изменение данных на беке, потом  если респонс = 200 -- изменение данных на фронте

import {
  ResponseGenerator,
  Credentials,
  Action,
  ActionGetTodos,
  ActionAddTodo,
  ActionDeleteToDo,
  createToDo,
  ToDo,
  ActionChangeItemToDo,
  ActionCheckItemToDo,
  ActionClearCompletedToDo,
  ActionSetFilter,
} from "./components/types/Types";

async function clearCompletedToDo(params: { filteredArr: ToDo[]; userId: string }) {
  const resp = await axios
    .post(`http://127.0.0.1:3001/clear-completed?user_id=${params.userId}`, {
      userId: params.userId,
    })
    .then(
      (response) => {
        // return getUserTodos(params.userId);
        return response
      },
      (error) => {
        console.log(error);
        return error;
      }
    );
  console.log("resp:", resp);
  return resp;
}

async function checkItemToDo(params: { itemTodoId: string; userId: string }) {
  const resp = await axios
    .post(`http://127.0.0.1:3001/check-data?user_id=${params.userId}`, {
      itemTodoId: params.itemTodoId,
      userId: params.userId,
    })
    .then(
      (response) => {
        // return getUserTodos(params.userId);
        return response;
      },
      (error) => {
        console.log(error);
        return error;
      }
    );
  console.log("resp:", resp);
  return resp;
}

async function changeItemToDo(params: { itemTodoValue: string; itemTodoId: string; userId: string }) {
  console.log("params", params);
  const resp = await axios
    .post(`http://127.0.0.1:3001/change-data?user_id=${params.userId}`, {
      itemTodoId: params.itemTodoId,
      userId: params.userId,
      itemTodoValue: params.itemTodoValue,
    })
    .then(
      (response) => {
        // return getUserTodos(params.userId);
        return response;
      },
      (error) => {
        console.log(error);
        return error;
      }
    );
  console.log("resp:", resp);
  return resp;
}

async function deleteItemToDo(params: { itemTodoId: string; userId: string }) {
  console.log("params in delete: ", params);

  const resp = await axios
    .post(`http://127.0.0.1:3001/delete-data?user_id=${params.userId}`, {
      itemTodoId: params.itemTodoId,
      userId: params.userId,
    })
    .then(
      (response) => {
        // return getUserTodos(params.userId);//getUserTodos
        return response;
      },
      (error) => {
        console.log(error);
        return error;
      }
    );
  console.log("resp:", resp);
  return resp;
}

async function addItemToDo(params: { itemTodo: createToDo; isAllCompleted: boolean; userId: string }) {
  const resp = await axios
    .post("http://127.0.0.1:3001/add-data", {
      itemTodo: params.itemTodo,
      // isAllCompleted: params.isAllCompleted,
      userId: params.userId,
    })
    .then(
      (response) => {
        // return getUserTodos(params.userId);
        return response.data;
      },
      (error) => {
        console.log(error);
        return error;
      }
    );
  console.log("resp:", resp);
  return resp;
}

async function switchAllUserToDo(params: { userId: string; isAllCompleted: boolean }) {
  console.log("params in SWITCH_ALL", params);
  const resp = await axios
    .post(`http://127.0.0.1:3001/switch-all?user_id=${params.userId}`, {
      userId: params.userId,
      isChecked: params.isAllCompleted,
    })
    .then(
      (response) => {
        return getUserTodos(params.userId);
        // return response.data;
      },
      (error) => {
        console.log(error);
        return error;
      }
    );
  console.log("resp:", resp);
  return resp;
}

// type setUserLoginType = (userState: Credentials) => Promise<string>;

async function getUserTodos(userId: string) {
  const response = await axios
    .get(`http://127.0.0.1:3001/get-data?user_id=${userId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}

// type setUserLoginType = (userState: Credentials) => Promise<string>;

// const userLogin: setUserLoginType = async (userState) => {
async function userLogin(userState: Credentials) {
  if (userState.email && userState.name && userState.password) {
    console.log("state:", userState);
    const resp = await axios
      .post("http://127.0.0.1:3001/login", {
        email: userState.email,
        password: userState.password,
        name: userState.name,
      })
      .then(
        (response) => {
          return response.data.userID;
        },
        (error) => {
          console.log(error);
        }
      );
    return resp;
  } else {
    alert("Some fields are empty. Please fill it");
  }
}

async function createUser(userState: Credentials) {
  console.log("state:", userState);
  if (userState.email && userState.name && userState.password) {
    const resp = await axios
      .post("http://127.0.0.1:3001/reg", {
        email: userState.email,
        password: userState.password,
        name: userState.name,
      })
      .then(
        (response) => {
          return response.data._id;
        },
        (error) => {
          console.log(error);
        }
      );
    return resp;
  } else {
    alert("Some fields are empty. Please fill it");
  }
}

function* workerSagaRegistration(payload: Action) {
  //Action => UserAction
  console.log("register", payload);
  try {
    const res: string = yield call(createUser, payload.payload);
    if (res) {
      yield put({ type: "INIT_REGISTRATION_SUCCESS", payload: res });
    } else {
      throw new Error("Could not get response");
    }
  } catch (e) {
    console.log("error", e);
  }
}

function* workerSagaLogin(payload: Action) {
  try {
    const res: string = yield call(userLogin, payload.payload);
    if (res) {
      yield put({ type: "LOG_IN_START_SUCCESS", payload: res });
    } else {
      yield put({ type: "LOG_IN_START_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (e) {
    console.log("error", e);
  }
}

function* workerSagaLogOut() {
  yield put({ type: "LOG_OUT_SUCCESS" });
}

function* workerSagaGetUsersTodos(payload: ActionGetTodos) {
  try {
    const response: ResponseGenerator = yield call(getUserTodos, payload.payload);
    if (response) {
      yield put({ type: "GET_USER_DATA_SUCCESS", payload: response.data });
    } else {
      yield put({ type: "LOG_IN_START_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (e) {
    console.log("error", e);
  }
}

function* workerSagaAllTodosComptited(payload: { payload: { userId: string; isAllCompleted: boolean }; type: string }) {
  console.log("payload", payload);
  const response: ResponseGenerator = yield call(switchAllUserToDo, payload.payload);
  console.log("response", response);
  yield put({
    type: "ALL_TODOS_COMPLITED_SUCCESS",
    payload: { data: response.data, isAllCompleted: payload.payload.isAllCompleted },
  });
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
    console.log("error", error);
  }
}

function* workerSagaDeleteItem(payload: ActionDeleteToDo) {
  const response: ResponseGenerator = yield call(deleteItemToDo, payload.payload); // response ==200?   yield put({ type: "DELETE_ITEMTODO_SUCCESS", payload: response.data });
  try {
    if (response) {
      const todosArray: ToDo[] = payload.payload.todosArray.filter((item) => item._id !== payload.payload.itemTodoId);
      yield put({ type: "DELETE_ITEMTODO_SUCCESS", payload: todosArray });
    } else {
      yield put({ type: "ADD_ITEMTODO_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
    console.log("error", error);
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
    console.log("error", error);
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
      yield put({ type: "CHECK_ITEMTODO_SUCESESS", payload: todosArray });
    } else {
      yield put({ type: "CHECK_ITEMTODO_VALUE_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
    console.log("error", error);
  }
}

function* workerSagaClearCompletedToDo(payload: ActionClearCompletedToDo) {
  console.log('payload', payload)
  const response: ResponseGenerator = yield call(clearCompletedToDo, payload.payload);
  try {
    if (response) {
      // const fileredArr = selectUserTodosArray.filter((todo) => todo.isChecked === false);

      // const todosArray: ToDo[] = payload.payload.todosArray.map((item) => {
      //   if (item._id === payload.payload.itemTodoId) {
      //     item.isChecked = !item.isChecked;
      //   }
      //   return item;
      // });
      yield put({ type: "CLEAR_COMPLETEDTODO_SUCESESS", payload: {filteredArr: payload.payload.filteredArr, filterType:  payload.payload.filterType}});
    } else {
      yield put({ type: "CLEAR_COMPLETEDTODO_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
    console.log("error", error);
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
    console.log("error", error);
  }
}

export function* watchSagaTodos() {
  yield takeEvery("GET_USER_DATA_REQUEST", workerSagaGetUsersTodos);
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
}

export function* rootSaga() {
  yield all([watchSagaUser(), watchSagaItemTodo(), watchSagaTodos()]);
}
