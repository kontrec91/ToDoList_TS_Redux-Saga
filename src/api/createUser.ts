import axios from "axios";
import jwt_decode from "jwt-decode";
import CryptoJS from "crypto-js";
import hash from "object-hash";
import { baseUrl } from "../constants/constants";

import { Credentials } from "../types/Types";

export async function createUser(userState: Credentials) {
  if (userState.email && userState.name && userState.password) {
    const hashPass = hash({ password: userState.password, key: `${process.env.REACT_APP_SECRET_KEY}`! });
    const encryptedPass = CryptoJS.AES.encrypt(hashPass, `${process.env.REACT_APP_SECRET_KEY}`!).toString();

    const resp = await axios
        .post(`${baseUrl+"/reg"}`, {
        email: userState.email,
        password: encryptedPass,
        name: userState.name,
      })
      .then(
        (response) => {
          localStorage.setItem("authToken", response.data.token);
          const decodedTocken: { _id: string } = jwt_decode(response.data.token);
          return decodedTocken._id;
        },
        (error) => {
          console.log("create User is failed", error);
        }
      );
    return resp;
  } else {
    alert("Some fields are empty. Please fill it");
  }
}
