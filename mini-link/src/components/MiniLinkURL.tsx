import { useState } from "react";
import CopyIcon from "../icons/CopyIcon";


interface MiniLinkURLPropTypes {
  alias: string;
}

function MiniLinkURL({ alias }: MiniLinkURLPropTypes): JSX.Element {

  const [isHovering, setIsHovering] = useState(true);

  return (
    <>
    <button
      className={`
        flex flex-row items-center group border-transparent border-2 rounded-xl hover:border-info
      `}
      onMouseEnter={()=>setIsHovering(!isHovering)}
      onMouseLeave={()=>setIsHovering(!isHovering)}
    >
      <CopyIcon isHidden={isHovering} />
      <h2 className="card-title m-1 text-secondary-content group-hover:text-info">
        {`minilink.com/${alias}`}  
      </h2>
    </button>
    </>
    
    
  )
}

export default MiniLinkURL;