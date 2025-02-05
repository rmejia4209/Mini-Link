import React from "react";

interface BaseInputPropTypes {
  label: string;
  name: string;
  placeHolder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  InputIcon?: React.ComponentType;
}


function BaseInput(
  { 
    label, name, placeHolder, value, onChange, onBlur, InputIcon
  }: BaseInputPropTypes) : JSX.Element
{
  return (
    <div className="w-full">
      <span className="text-xl font-semibold text-primary pl-2"
      >
        {label}
      </span>
      <label className={`
          input input-lg input-bordered input-primary rounded-xl
          w-full flex items-center gap-2
        `}
      >
        {InputIcon ? <InputIcon/> : null}
        <input        
          type='text'
          className='grow truncate'
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
    </div>
    
  )
}


export default BaseInput;
