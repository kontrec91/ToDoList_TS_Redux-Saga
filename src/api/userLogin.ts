import axios from "axios";
import CryptoJS from "crypto-js";
import hash from "object-hash";
import { baseUrl } from "../constants/constants";

import { Credentials } from "../types/Types";

export async function userLogin(userState: Credentials) {

  if (userState.email && userState.name && userState.password) {
    const hashPass = hash({ password: userState.password, key: `${process.env.REACT_APP_SECRET_KEY}`! });

    const encryptedPass = CryptoJS.AES.encrypt(hashPass, `${process.env.REACT_APP_SECRET_KEY}`!).toString();
    // const bytes = CryptoJS.AES.decrypt(encryptedPass, `${process.env.REACT_APP_SECRET_KEY}`);//????
    // const decryptPassword = bytes.toString(CryptoJS.enc.Utf8);//???

    const resp = await axios
      // .post("http://127.0.0.1:3001/login", {
      .post(`${baseUrl + "/login"}`, {
        email: userState.email,
        password: encryptedPass,
        name: userState.name,
      })
      .then(
        (response) => {
          console.log("response in userLogin", response.data);
          localStorage.setItem("authToken", response.data.token.accesToken);
          return response.data.userID;
        },
        (error) => {
          console.log("user Login is failed", error);
        }
      );
    return resp;
  } else {
    alert("Some fields are empty. Please fill it");
  }
}
