import React, { FC, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../sagas/actions/AuthActions";
import { InitState } from "../types/Types";
import { SelectUserId } from "../sagas/selector/selectors";

export const UserLogOut: FC = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector(SelectUserId);

  useEffect(() => {
    if (userId) {
      navigate("/todopage");
    } else {
      navigate("/");
    }
  }, [userId]);

  const handlerLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="logOut-block">
      <button className="submit-button" onClick={handlerLogOut}>
        log Out
      </button>
    </div>
  );
};
