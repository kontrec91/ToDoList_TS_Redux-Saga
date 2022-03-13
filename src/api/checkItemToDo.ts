import axios from "axios";
import { baseUrl } from "../constants/constants";
import $api from "../sagas";

export async function checkItemToDo(params: { itemTodoId: string; userId: string }) {
  // const resp = await axios
  //   .post(
  //     `${baseUrl + "/check-data"}`,
  //     {
  //       itemTodoId: params.itemTodoId,
  //     },
  //     {
  //       headers: {
  //         Authorization: "Bearer " + `${localStorage.getItem("authToken")}`,
  //       },
  //     }
  //   )
  const response = await $api
    .post("/check-data", {
      itemTodoId: params.itemTodoId,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      // refreshTokens(params.userId, checkItemToDo, params);
    });
  return response;
}
