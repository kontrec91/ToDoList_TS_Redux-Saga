import axios from "axios";
import { logOutUser } from "./logOutUser";
import { createToDo } from "../types/Types";
import { baseUrl } from "../constants/constants";
import $api from "../sagas";

export async function addItemToDo(params: { itemTodo: createToDo; isAllCompleted: boolean; userId: string }) {
  // const response = await axios
  //   .post(
  //     `${baseUrl + "/add-data"}`,
  //     {
  //       itemTodo: params.itemTodo,
  //     },
  //     {
  //       headers: {
  //         Authorization: "Bearer " + `${localStorage.getItem("authToken")}`,
  //       },
  //     }
  //   )

  const response = await $api
    .post("/add-data", {
      itemTodo: params.itemTodo,
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 400) {
        return response.data;
      } else {
        // logOutUser();
      }
    })
    .catch((e) => {
      console.log("ERROR.CONFIG IN ADDDATA", e.config); //здесь собраны параметры запроса, его можно опять запустить
      // тут делать запрос на рефрештокены, а затем повторять текущий запрос????
      console.log("add Item ToDo failed", e);
    });
  return response;
}
