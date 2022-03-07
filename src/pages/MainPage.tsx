import React, { FC, ReactElement, useEffect, useState } from "react";
import * as actions from "../sagas/actions/AuthActions";
import store from "../StoreSaga";
import { useDispatch, useSelector } from "react-redux";
import { InitState, Credentials } from "../types/Types";
import { InitLogin, InitRegistration } from "../sagas/actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { SelectUserId } from "../sagas/selector/selectors";

const MainPage: FC = (): ReactElement => {
  console.log("store: ", store.getState());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState<boolean>(false);

  const userId = useSelector((state: InitState) => state.userId);

  console.log('userId in state, MainPage ', userId);

  useEffect(() => {
    if (userId) {
      console.log('go to todopage');
      navigate("/todopage");
    } else {
      navigate("/");
      console.log('not to go to todopage');
    }
    console.log("userid in store", userId);
  },[userId]);


  // useEffect(() => {
  //   if (SelectUserId(state)) {
  //     console.log('go to todopage')
  //     navigate("/todopage");
  //   } else {
  //     navigate("/");
  //     console.log('not to go to todopage')
  //   }
  //   console.log("userid in store", SelectUserId(state));
  // },[SelectUserId(state)]);//блок кода не срабатывает корректно, о есть не пускает юзера на страницу его тудушек когда он залогинился


  // useEffect(() => {
  //   if (localStorage.authToken) {
  //     console.log('go to todopage')
  //     navigate("/todopage");
  //   } else {
  //     navigate("/");
  //     console.log('not to go to todopage')
  //   }
  //   console.log("userid in store", SelectUserId(state));
  // },[localStorage]);//блок кода не срабатывает корректно, о есть не пускает юзера на страницу его тудушек когда он залогинился

  const [credentials, setCredentials] = useState<Credentials>({ email: "", password: "", name: "" });

  const handleCreateUser = () => {
    console.log("register", credentials);
    dispatch(InitRegistration(credentials));
  };

  const handleChange = (event: any) => setCredentials({ ...credentials, [event.target.name]: event.target.value });

  const handleUserLogin = () => {
    dispatch(InitLogin(credentials));
  };

  return (
    <div className="mainPage">
      <input
        className="input-goal"
        name="name"
        value={credentials.name}
        onChange={handleChange}
        placeholder="User name"
      />
      <input
        className="input-goal"
        name="email"
        placeholder="User email"
        value={credentials.email}
        onChange={handleChange}
      />
      <div className="password-block">
        <input
          className="input-goal"
          type={isShow ? "text" : "password"}
          name="password"
          placeholder="User password"
          value={credentials.password}
          onChange={handleChange}
        />
        <span onClick={() => setIsShow(!isShow)}>
          <img
            alt="eye.png"
            className={`${isShow ? "password-clicked" : ""} password`}
            // src={`${
            //   isShow
            //     ? "https://img.icons8.com/material-outlined/24/000000/visible--v1.png"
            //     : "data:image/png;base64,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"
            // }`}
            src="https://img.icons8.com/material-outlined/24/000000/visible--v1.png"
          />
        </span>
      </div>
      <div>
        <button className="submit-button" onClick={handleCreateUser}>
          Sign up
        </button>
        <button className="submit-button" onClick={handleUserLogin}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default MainPage;
