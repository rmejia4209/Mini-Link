import BaseButton from "./base/BaseButton";
import FollowIcon from "../icons/FollowIcon";

function FollowLinkButton(): JSX.Element {
  return (
    <BaseButton
      className="btn-sm btn-accent btn-outline"
      text="Go"
      onClick={()=>{console.log('clicked')}}
      Icon={FollowIcon}
    />
  )
}


export default FollowLinkButton;