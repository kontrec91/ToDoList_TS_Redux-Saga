import axios from "axios";
import { baseUrl } from "../constants/constants";

export async function changeItemToDo(params: { itemTodoValue: string; itemTodoId: string; userId: string }) {
    const resp = await axios
      .post(
        `${baseUrl+'/change-data'}`,
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
      .catch((e) => console.log("Change Item ToDo Failed", e));
  
    return resp;
  }