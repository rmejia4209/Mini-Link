import React from "react";

interface baseInputPropTypes {
  placeHolder: string;
  InputIcon?: React.ComponentType;
}


function BaseInput({ placeHolder, InputIcon }: baseInputPropTypes) {
  return (
    <label
      className='input input-bordered flex items-center gap-2 w-full max-w-xs'
    >
      {InputIcon ? <InputIcon /> : null}
      <input
        type='text'
        className='grow'
        placeholder={placeHolder}
      />
    </label>
  )
}


export default BaseInput;
