import React from "react";


interface BaseButtonPropTypes {
    className?: string;
    Icon?: React.ComponentType;
    text?: string;
    onClick?: () => void;
}

function BaseButton({ className='', Icon, text, onClick }: BaseButtonPropTypes): JSX.Element {
  return (
    <button className={`btn rounded-xl ${className}`} onClick={onClick}>
      {Icon ? <Icon/> : null}
      {text}
    </button>
  )
}

export default BaseButton;