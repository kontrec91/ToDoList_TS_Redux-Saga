import axios from "axios";
import { baseUrl } from "../constants/constants";
import $api from "../sagas";

export async function changeItemToDo(params: { itemTodoValue: string; itemTodoId: string; userId: string }) {
  // const response = await axios
  //   .post(
  //     `${baseUrl+'/change-data'}`,
  //     {
  //       itemTodoId: params.itemTodoId,
  //       itemTodoValue: params.itemTodoValue,
  //     },
  //     {
  //       headers: {
  //         Authorization: "Bearer " + `${localStorage.getItem("authToken")}`,
  //       },
  //     }
  //   )

  const response = await $api
    .post("/change-data", {
      itemTodoId: params.itemTodoId,
      itemTodoValue: params.itemTodoValue,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => console.log("Change Item ToDo Failed", e));

  return response;
}
