import axios from "axios";
// import * as actions from "./constants/constants";
import { ToDo } from "../types/Types";
import { baseUrl } from "../constants/constants";

export async function clearCompletedToDo(params: { filteredArr: ToDo[]; userId: string }) {
  const resp = await axios
    .post(
      // `http://127.0.0.1:3001/clear-completed`,
      `${baseUrl+'/clear-completed'}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + `${localStorage.getItem("authToken")}`,
        },
      }
    )
    .then((response) => {
      // yield put({
      //   type: "CLEAR_COMPLETEDTODO_SUCESESS",
      //   payload: { filteredArr: payload.payload.filteredArr, filterType: payload.payload.filterType },
      // });
      return response;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        // refreshTokens(params.userId, clearCompletedToDo, params);
      }
    });
  return resp;
}
