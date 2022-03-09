import axios from "axios";
import { logOutUser } from "./logOutUser";
import { createToDo } from "../types/Types";
import { baseUrl } from "../constants/constants";

export async function addItemToDo(params: { itemTodo: createToDo; isAllCompleted: boolean; userId: string }) {
  const resp = await axios
    .post(
      `${baseUrl+"/add-data"}`,
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
      if (response.status >= 200 && response.status < 400) {
        return response.data;
      } else {
        logOutUser();
      }
    })
    .catch((e) => console.log("add Item ToDo failed", e));
  return resp;
}
