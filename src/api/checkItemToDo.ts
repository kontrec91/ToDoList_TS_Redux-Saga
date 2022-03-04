import axios from "axios";
import { baseUrl } from "../constants/constants";

export async function checkItemToDo(params: { itemTodoId: string; userId: string }) {
  const resp = await axios
    .post(
      // `http://127.0.0.1:3001/check-data`,
      `${baseUrl + "/check-data"}`,
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
    .catch((e) => {
      // refreshTokens(params.userId, checkItemToDo, params);
    });
  return resp;
}
