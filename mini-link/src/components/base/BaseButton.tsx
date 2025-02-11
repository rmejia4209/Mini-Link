import React from "react";


interface BaseButtonPropTypes {
    text?: string;
    onClick: () => void;
    className?: string;
    Icon?: React.ComponentType;
}

function BaseButton({ className='', onClick, text, Icon }: BaseButtonPropTypes): JSX.Element {
  return (
    <button className={`btn rounded-xl ${className}`} onClick={onClick}>
      {Icon ? <Icon/> : null}
      {text}
    </button>
  )
}

export default BaseButton;