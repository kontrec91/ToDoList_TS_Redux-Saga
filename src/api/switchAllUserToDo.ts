import axios from "axios";
import { baseUrl } from "../constants/constants";
import $api from "../sagas";

export async function switchAllUserToDo(params: { userId: string; isAllCompleted: boolean }) {
  // const resp = await axios
  //   .post(
  //     `${baseUrl + "/switch-all"}`,
  //     {
  //       isChecked: params.isAllCompleted,
  //     },
  //     {
  //       headers: {
  //         Authorization: "Bearer " + `${localStorage.getItem("authToken")}`, //??????
  //       },
  //     }
  //   )

  const response = await $api
    .post("/switch-all", {
      isChecked: params.isAllCompleted,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => console.log("switch All User ToDo failed", e));
  return response;
}
