import React, { FC, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../sagas/actions/AuthActions";
import { InitState } from "../types/Types";
import { SelectUserId, state } from "../sagas/selector/selectors";

export const UserLogOut: FC = (): ReactElement => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const selectUserId = useSelector((state:InitState) => state.userId);

    useEffect(() => {
        if (SelectUserId(state)) {
          navigate("/todopage");
        } else {
          navigate("/");
        }
      }, [SelectUserId]);
 

    const handlerLogOut = () => {
        dispatch(logOut());
    }

  return (
      <div className="logOut-block">
          <button className="submit-button" onClick ={handlerLogOut}>log Out</button>
      </div>
  )  
};