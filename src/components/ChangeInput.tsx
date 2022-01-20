import React, {useState} from "react";

export const ChangeInput = (props) => {
    const [newInputValue, setNewInputValue] = useState("");

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