import axios from "axios";
import * as actions from "./constants/constants";
import { call, put, takeEvery, all } from "redux-saga/effects";
import jwt_decode from "jwt-decode";
import CryptoJS from "crypto-js";
import hash from "object-hash";

// 1. убрать везде запросы на получение данных из бека
// 2. прокидывать масив тудушек в payload в экшене
// 3. изменение данных на беке, потом  если респонс = 200 -- изменение данных на фронте

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
} from "./components/types/Types";

async function clearCompletedToDo(params: { filteredArr: ToDo[]; userId: string }) {
  const resp = await axios
    .post(
      `http://127.0.0.1:3001/clear-completed`,
      {},
      {
        headers: {
          Authorization: "Bearer " + `${localStorage.getItem("authToken")}`,
        },
      }
    )
    .then((response) => {
      console.log("55555555555RRESPONSE!!!!!!!!!!!!!clearCompletedToDo", response);
      // yield put({
      //   type: "CLEAR_COMPLETEDTODO_SUCESESS",
      //   payload: { filteredArr: payload.payload.filteredArr, filterType: payload.payload.filterType },
      // });
      return response;
    })
    .catch((error) => {
      console.log("ERRRRORRRRRRRRRRRRRRR", error.response);
      if (error.response.status === 401) {
        console.log("params.userId!!!!!!!!!!!!!!!!!!!!!!!!", params.userId);
        // refreshTokens(params.userId, clearCompletedToDo, params);
      }
    });
  console.log("resp:", resp);
  return resp;
}

async function checkItemToDo(params: { itemTodoId: string; userId: string }) {
  const resp = await axios
    .post(
      `http://127.0.0.1:3001/check-data`,
      {
        itemTodoId: params.itemTodoId,
      },
      {
        headers: {
          Authorization: "Bearer " + `${localStorage.getItem("authToken")}`,
        },
      }
    )
    .then((response) => {
      console.log("STATUS!!!!!!!!!!!!!", response.status);
      return response;
    })
    .catch((e) => {
      console.log("ERRRRORRRRRRRRRRRRRRR", e);
      // refreshTokens(params.userId, checkItemToDo, params);
    });
  console.log("resp:", resp);
  return resp;
}

async function changeItemToDo(params: { itemTodoValue: string; itemTodoId: string; userId: string }) {
  console.log("params", params);
  const resp = await axios
    .post(
      `http://127.0.0.1:3001/change-data`,
      {
        itemTodoId: params.itemTodoId,
        itemTodoValue: params.itemTodoValue,
      },
      {
        headers: {
          Authorization: "Bearer " + `${localStorage.getItem("authToken")}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((e) => console.log("ERRRRORRRRRRRRRRRRRRR", e));
  console.log("resp:", resp);
  return resp;
}

async function deleteItemToDo(params: { itemTodoId: string; userId: string }) {
  console.log("params in delete: ", params);
  const resp = await axios
    .post(
      `http://127.0.0.1:3001/delete-data`,
      {
        itemTodoId: params.itemTodoId,
      },
      {
        headers: {
          Authorization: "Bearer " + `${localStorage.getItem("authToken")}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((e) => console.log("ERRRRORRRRRRRRRRRRRRR", e));
  console.log("resp:", resp);
  return resp;
}

async function addItemToDo(params: { itemTodo: createToDo; isAllCompleted: boolean; userId: string }) {
  const resp = await axios
    .post(
      "http://127.0.0.1:3001/add-data",
      {
        itemTodo: params.itemTodo,
      },
      {
        headers: {
          Authorization: "Bearer " + `${localStorage.getItem("authToken")}`,
        },
      }
    )
    .then((response) => {
      console.log("RESPONSE", response);
      if (response.status >= 200 && response.status < 400) {
        return response.data;
      } else {
        logOutUser();
      }
    })
    .catch((e) => console.log("ERRRRORRRRRRRRRRRRRRR", e));
  console.log("resp:", resp);
  return resp;
}

async function switchAllUserToDo(params: { userId: string; isAllCompleted: boolean }) {
  console.log("params in SWITCH_ALL", params);
  const resp = await axios
    .post(
      `http://127.0.0.1:3001/switch-all`,
      {
        isChecked: params.isAllCompleted,
      },
      {
        headers: {
          Authorization: "Bearer " + `${localStorage.getItem("authToken")}`, //??????
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((e) => console.log("ERRRRORRRRRRRRRRRRRRR", e));
  console.log("resp:", resp);
  return resp;
}

// type setUserLoginType = (userState: Credentials) => Promise<string>;

async function getUserTodos(userId: string) {
  const response = await axios
    .get(`http://127.0.0.1:3001/get-data`, {
      headers: {
        Authorization: "Bearer " + `${localStorage.getItem("authToken")}`, //??????
      },
    })
    .then((response) => {
      console.log("RESPONSE", response);
      return response;
    })
    .catch((e) => console.log("ERRRRORRRRRRRRRRRRRRR", e));
  console.log("response", response);
  return response;
}

// type setUserLoginType = (userState: Credentials) => Promise<string>;

// const userLogin: setUserLoginType = async (userState) => {

async function userLogin(userState: Credentials) {
  if (userState.email && userState.name && userState.password) {
    const hashPass = hash({ password: userState.password, key: `${process.env.REACT_APP_SECRET_KEY}`! });
    console.log("hash", process.env.REACT_APP_SECRET_KEY);

    const encryptedPass = CryptoJS.AES.encrypt(hashPass, `${process.env.REACT_APP_SECRET_KEY}`!).toString();
    console.log("encryptedPass12312313131", encryptedPass);

    // const encryptedPass = Encrypt(hashPass, `${process.env.REACT_APP_SECRET_KEY}`!)
    // console.log('encryptedPass12312313131', encryptedPass);

    console.log("12312313131", encryptedPass);
    const bytes = CryptoJS.AES.decrypt(encryptedPass, `${process.env.REACT_APP_SECRET_KEY}`);
    const decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decryptPassword11111111111111111", decryptPassword, "typeof", typeof decryptPassword);

    const resp = await axios
      .post("http://127.0.0.1:3001/login", {
        email: userState.email,
        password: encryptedPass,
        name: userState.name,
      })
      .then(
        (response) => {
          localStorage.setItem("authToken", response.data.token);
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
    const hashPass = hash({ password: userState.password, key: `${process.env.REACT_APP_SECRET_KEY}`! });
    const encryptedPass = CryptoJS.AES.encrypt(hashPass, `${process.env.REACT_APP_SECRET_KEY}`!).toString();

    const resp = await axios
      .post("http://127.0.0.1:3001/reg", {
        email: userState.email,
        password: encryptedPass,
        name: userState.name,
      })
      .then(
        (response) => {
          localStorage.setItem("authToken", response.data.token);
          const decodedTocken: { _id: string } = jwt_decode(response.data.token);
          return decodedTocken._id;
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

function logOutUser() {
  localStorage.removeItem("authToken");
}

function* workerSagaRegistration(payload: UserAction) {
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
    console.log("error", e);
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
    console.log("error", e);
  }
}

function* workerSagaAllTodosComptited(payload: {
  payload: { userId: string; isAllCompleted: boolean; todosArray: ToDo[] };
  type: string;
}) {
  console.log("payload", payload);
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
    console.log("error", error);
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
    console.log("error", error);
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
      yield put({
        type: "CHECK_ITEMTODO_SUCESESS",
        payload: { todosArray: todosArray, isAllcompleted: payload.payload.isAllCompleted },
      });
    } else {
      console.log("RESPONSE!!!!!!!!!!", response);
      yield put({ type: "CHECK_ITEMTODO_VALUE_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
    console.log("error", error);
    //запрос на рефреш токен
  }
}

function* workerSagaClearCompletedToDo(payload: ActionClearCompletedToDo) {
  console.log("payload", payload);
  const response: ResponseGenerator = yield call(clearCompletedToDo, payload.payload);
  console.log("RESPONSE!!!!!!!workerSagaClearCompletedToDo", response);
  try {
    if (response.status === 200) {
      yield put({
        type: "CLEAR_COMPLETEDTODO_SUCESESS",
        payload: { filteredArr: payload.payload.filteredArr, filterType: payload.payload.filterType },
      });
    }
    if (response.status === 401) {
      console.log("12312313payload.payload!!!!!!!!!!!!!!!!!!!!!!!!", payload.payload);
      const resp = refreshTokens(payload.payload.userId, clearCompletedToDo, payload.payload);
      // ЗАПУСКАТЬ ТУТ refreshTokens А НЕ ВНУТРИ clearCompletedToDo
      // if (resp:any) {
      //   yield put({
      //     type: "CLEAR_COMPLETEDTODO_SUCESESS",
      //     payload: { filteredArr: payload.payload.filteredArr, filterType: payload.payload.filterType },
      //   });
      // }
    }
  } catch (error: any) {
    console.log("ERRRRORRRRRRRRRRRRRRR", error.response);
    yield put({ type: "CLEAR_COMPLETEDTODO_FAILED" });

    // if (error.response.status === 401) {
    //   console.log("params.userId!!!!!!!!!!!!!!!!!!!!!!!!",  payload.payload.userId);
    //    refreshTokens( payload.payload.userId, clearCompletedToDo,  payload.payload);
    // }
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
    console.log("error", error);
  }
}

async function refreshTokens(userId: string, callback: any, params: any) {
  //after run code reducer must know what to do
  console.log("REFRESHTOKEN", userId, "REFRESHTOKEN", callback, "REFRESHTOKEN", params);
  // async function refreshTokens(params: {userId: string, callback: any, params: any}) {
  const resp = await axios
    .post("http://127.0.0.1:3001/refresh", {
      userId: userId,
    })
    .then(
      async (response) => {
        console.log("RRESPONSE!!!!!!!!!!!!!", response.data);
        localStorage.setItem("authToken", response.data.accesToken);
        if (callback) {
          console.log("!!!!!!!!!!!!!!!!!!!11111111111111111111111111111", params);
          await callback(params);
        }
        // return response.data.userID;
      },
      (error) => {
        console.log(error);
      }
    );
  return resp;
}

function* workerSagaRefreshTokens(userId: string) {
  //////////&&&&&&&&&&&&&&&&????????????????? need login here
  const response: ResponseGenerator = yield call(refreshTokens, userId, null, null);
  try {
    if (response) {
      console.log("RESPONSE!!!!!!!!!!!!!Q1123123", response);
      yield put({
        type: "CREATE_TOKENS_SUCESESS",
        payload: {},
      });
    } else {
      yield put({ type: "CREATE_TOKENS_FAILED" });
      throw new Error("Could not get response");
    }
  } catch (error) {
    console.log("error", error);
  }
}

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
  // yield takeEvery ("", workerSagaRefreshTokens);
}

export function* rootSaga() {
  yield all([watchSagaUser(), watchSagaItemTodo(), watchSagaTodos()]);
}
