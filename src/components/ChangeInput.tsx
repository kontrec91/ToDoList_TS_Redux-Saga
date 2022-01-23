import React, { FC, ReactElement, useState } from "react";
import { Props } from "./types/Types";

export const ChangeInput: FC<Props> = (props: Props): ReactElement => {
  const [newInputValue, setNewInputValue] = useState<string>("");

  return (
    <input
      onBlur={() => props.handleOnBlur(newInputValue)}
      className="set-value-li"
      defaultValue={props.value}
      onChange={(e) => setNewInputValue(e.target.value)}
      autoFocus
    />
  );
};
