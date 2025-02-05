import { useState } from "react";
import CopyIcon from "../icons/CopyIcon";

interface MiniLinkURLPropTypes {
  miniLink: string;
  isNew?: boolean;
}

function MiniLinkURL({ miniLink, isNew }: MiniLinkURLPropTypes): JSX.Element {

  const [isHovering, setIsHovering] = useState(true);

  return (
    <>
    <button
      className="group border-transparent border-2 rounded-xl hover:border-info"
      onMouseEnter={()=>setIsHovering(!isHovering)}
      onMouseLeave={()=>setIsHovering(!isHovering)}
    >
      <h2 className="card-title m-1 text-secondary-content group-hover:text-info">
        {miniLink}
        <CopyIcon isHidden={isHovering} />
      </h2>
    </button>
    {isNew ? <div className="badge badge-secondary">NEW</div> : null}
    </>
    
    
  )
}

export default MiniLinkURL;