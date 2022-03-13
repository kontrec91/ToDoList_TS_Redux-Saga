import axios from "axios";
import { baseUrl } from "../constants/constants";
import $api from "../sagas";

export async function deleteItemToDo(params: { itemTodoId: string; userId: string }) {
  // const resp = await axios
  //   .post(
  //     `${baseUrl + "/delete-data"}`,
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
    .post("/delete-data", {
      itemTodoId: params.itemTodoId,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => console.log("delete Item ToDo failed", e));
  return response;
}
