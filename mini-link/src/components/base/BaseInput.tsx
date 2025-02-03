import React from "react";

interface BaseInputPropTypes {
  placeHolder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  InputIcon?: React.ComponentType;
}


function BaseInput(
  { 
    placeHolder, onChange, onBlur, InputIcon
  }: BaseInputPropTypes) : JSX.Element
{
  return (
    <label
      className='input input-bordered flex items-center gap-2 w-full max-w-xs'
    >
      {InputIcon ? <InputIcon/> : null}
      <input
        type='text'
        className='grow'
        placeholder={placeHolder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  )
}


export default BaseInput;
