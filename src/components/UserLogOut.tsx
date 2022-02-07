import React, { FC, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../actions/AuthActions";
import { InitState } from "./types/Types";


export const UserLogOut: FC = (): ReactElement => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectUserId = useSelector((state:InitState) => state.userId);

    useEffect(() => {
        if (selectUserId) {
          navigate("/todopage");
        } else {
          navigate("/");
        }
        console.log("userid in store", selectUserId);
      }, [selectUserId]);
 

    const handlerLogOut = () => {
        dispatch(logOut());
    }

  return (
      <div className="logOut-block">
          <button className="submit-button" onClick ={handlerLogOut}>log Out</button>
      </div>
  )  
};