import React from "react";

interface BaseInputPropTypes {
  name: string;
  placeHolder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  InputIcon?: React.ComponentType;
}


function BaseInput(
  { 
    name, placeHolder, value, onChange, onBlur, InputIcon
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
        name={name}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  )
}


export default BaseInput;
