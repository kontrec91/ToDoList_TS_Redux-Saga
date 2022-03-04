import axios from "axios";
import { baseUrl } from "../constants/constants";

export async function deleteItemToDo(params: { itemTodoId: string; userId: string }) {
  const resp = await axios
    .post(
      // `http://127.0.0.1:3001/delete-data`,
      `${baseUrl + "/delete-data"}`,
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
    .catch((e) => console.log("delete Item ToDo failed", e));
  return resp;
}
