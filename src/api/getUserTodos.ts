import axios from "axios";
import { baseUrl } from "../constants/constants";

export async function getUserTodos(userId: string) {
    const response = await axios
        .get(`${baseUrl+'/get-data'}`, {

        headers: {
          Authorization: "Bearer " + `${localStorage.getItem("authToken")}`, //??????
        },
      })
      .then((response) => {
        return response;
      })
      .catch((e) => console.log("get User Todos failed", e));
    return response;
  }