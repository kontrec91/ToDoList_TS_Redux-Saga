import React, {FC, ReactElement, useState } from "react";

type IProps = {
  handleOnBlur: (arg0: string)=> void,
  value: string
};

export const ChangeInput: FC<IProps> = (props: IProps): ReactElement=> {

    const [newInputValue, setNewInputValue] = useState<string>("");

    return (
      <input 
        onBlur={()=>props.handleOnBlur(newInputValue)} 
        className="set-value-li" 
        defaultValue={props.value}
        onChange={(e)=> setNewInputValue(e.target.value)} 
        autoFocus 
      />
    );
}