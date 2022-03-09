import axios from "axios";
import { ToDo } from "../types/Types";
import { baseUrl } from "../constants/constants";

// export async function clearCompletedToDo(params: { filteredArr: ToDo[]; userId: string }) {
export async function clearCompletedToDo(token: string) {
  const resp = await axios
    .post(
      `${baseUrl+'/clear-completed'}`,
      {},
      {
        headers: {
          // Authorization: "Bearer " + `${localStorage.getItem("authToken")}`,
          Authorization: "Bearer " + `${token}`,
        },
      }
    )
    .then((response) => {
      console.log('RESPONSE IN clearCompletedToDo', response);
      return response;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        console.log('ERROR IN clearCompletedToDo', error);
        // refreshTokens(params.userId, clearCompletedToDo, params);
        return error;
      }
    });
  return resp;
}
