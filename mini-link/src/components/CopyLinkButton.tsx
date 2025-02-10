import BaseButton from "./base/BaseButton";
import CopyIcon from "../icons/CopyIcon";


function CopyLinkButton(): JSX.Element {

  
  return (
    <BaseButton
      className="btn-sm btn-primary btn-outline"
      text="Copy"
      onClick={()=>{console.log('clicked')}}
      Icon={CopyIcon}
    />
  )
}

export default CopyLinkButton;