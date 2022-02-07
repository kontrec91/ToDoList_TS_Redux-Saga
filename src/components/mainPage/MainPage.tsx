import React, { FC, ReactElement, useEffect, useState } from "react";
import * as actions from "../../actions/AuthActions";
import store from "../../StoreSaga";
import { useDispatch, useSelector } from "react-redux";
import { InitState, Credentials } from "../types/Types";
import { InitLogin, InitRegistration  } from "../../actions/AuthActions";
import { useNavigate } from "react-router-dom";

const MainPage: FC = (): ReactElement => {
  console.log("store: ", store.getState());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState<boolean>(false);

  const selectUserId = useSelector((state: InitState) => state.userId);

  useEffect(() => {
    if (selectUserId) {
      navigate("/todopage");
    } else {
      navigate("/");
    }
    console.log("userid in store", selectUserId);
  }, [selectUserId]);

  const [credentials, setCredentials] = useState<Credentials>({ email: "", password: "", name: "" });

  const handleCreateUser = () => {
    console.log('register',credentials )
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
            src="https://img.icons8.com/material-outlined/24/000000/visible--v1.png"
          />
        </span>
      </div>
      <div>
        <button className="submit-button" onClick={handleCreateUser}>
          Registration
        </button>
        <button className="submit-button" onClick={handleUserLogin}>
          Check in
        </button>
      </div>
    </div>
  );
};

export default MainPage;
