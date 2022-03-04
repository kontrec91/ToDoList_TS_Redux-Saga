import axios from "axios";
import { baseUrl } from "../constants/constants";

export async function switchAllUserToDo(params: { userId: string; isAllCompleted: boolean }) {
  const resp = await axios
    .post(
      // `http://127.0.0.1:3001/switch-all`,
      `${baseUrl + "/switch-all"}`,
      {
        isChecked: params.isAllCompleted,
      },
      {
        headers: {
          Authorization: "Bearer " + `${localStorage.getItem("authToken")}`, //??????
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((e) => console.log("switch All User ToDo failed", e));
  return resp;
}