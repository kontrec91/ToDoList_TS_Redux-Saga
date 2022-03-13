import axios from "axios";
import { baseUrl } from "../constants/constants";
import $api from "../sagas";

export async function getUserTodos(userId: string) {
  // const response = await axios
  //     .get(`${baseUrl+'/get-data'}`, {
  //     headers: {
  //       Authorization: "Bearer " + `${localStorage.getItem("authToken")}`, //??????
  //     },
  //   })
  const response = await $api
    .get("/get-data")
    .then((response) => {
      return response;
    })
    .catch((e) => console.log("get User Todos failed", e));
  return response;
}
